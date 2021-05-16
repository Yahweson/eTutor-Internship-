import React, {Component} from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class AdminEdit extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        

        this.onSubmit = this.onSubmit.bind(this);
      

        this.state = {
            
            password:"",
            username:"",
            admins:[],
            
            
        }
    }


    onChangePassword(e) {
        this.setState({
            password : e.target.value
        });
    }

    onChangeUsername(e){
        this.setState({
            username : e.target.value
        });
    }

    conmponentDidMount(){
        
        axios.get('http://localhost:5000/adminInfo/')
            .then(response => {
                this.setState({admins: response.data});
                console.log(this.state.admins);
           })
           .catch((err) => {
               console.log(err);
             });  
    }

    onSubmit(e){
        e.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        

        const adminInfo = {
            username,
            password,
        }

        console.log(this.props.match.params.id);
        console.log(username);
        axios.post("http://localhost:5000/adminInfo/update/" + this.props.match.params.id, adminInfo, {
        }).then(res => {
            console.log(res)
        });


        console.log({adminInfo});
     //   window.location = '/admin/dash';
    }

    render(){
        return(
            <div>
                <p>You are on the Admin Edit Component</p>
                <p>Please populate fields to be updated</p>
                <form onSubmit = {this.onSubmit}>

                    

                    <div className="form-group p-2 m-2">

                        <input 
                            type="text" 
                            className="form-control  text-center" 
                            name="username" 
                            id="username" 
                            placeholder="username"
                            onChange = {this.onChangeUsername}
                        />
                    </div>

					<div className="input-group my-3">					
						<div className="input-group-prepend">
								<span className="input-group-text"><i className="fas fa-user"></i></span>
							</div>

                        <input 
                            type="text" 
                            className="form-control  text-center" 
                            name="password" 
                            id="password" 
                            placeholder="password"
                            onChange = {this.onChangePassword}
                            />
					</div>

	
						<button type="submit" className="btn btn-outline-success btn-block text-uppercase">
							<i className="fas fa-sign-in-alt"></i> Login </button>
                </form>
            </div>
        )
    }

}


