import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminViewer = props =>(
    <tr>
        <td>{props.admin.username}</td>
        <td>{props.admin.password}</td>

        <td>
            <Link to= {"/AdminEdit/" + props.admin._id}>edit</Link> | <a href="#" onClick={() => {props.deleteAdmin(props.admin._id)}}>delete</a>
        </td>
    </tr>
)

class AdminView extends Component {
    constructor(props) {
        super(props); 

        this.deleteAdmin = this.deleteAdmin.bind(this);

        this.state = {
            admins: []
        }
    } 

    deleteAdmin(id){
        axios.delete('/adminInfo/remove/' + id)
            .then( res => console.log(res.data));

        this.setState({
            admins: this.state.admins.filter(el => el._id !== id)
        })
    }

     componentDidMount(){
        axios.get('http://localhost:5000/adminInfo/')
            .then(response => {
                this.setState({admins: response.data});
                console.log(this.state.admins);
           })
           .catch((err) => {
               console.log(err);
             });    

           // const url ="http://localhost:5000/patients/";
            //const response = await fetch(url);
            //const data = await response.json();
            //this.setState({
             // patients: data.results[0]    
           // });    
     }

     adminList() {
        return this.state.admins.map(currentAdmin => {
            return <AdminViewer admin={currentAdmin} deleteAdmin={this.deleteAdmin} key={currentAdmin._id} />;
        })
    }

    render() {
        return (
            <div>
                <h2>Admins</h2>

                <table className = "table">
                    <thead className ="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>adminPassword</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        { this.adminList() }
                    </tbody>
                </table>
            </div>
          );
    }

}

export default AdminView;
