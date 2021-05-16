import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SubjectViewer = props =>(
    <tr>
        
        <td>{props.subject.subjectCode}</td>
        <td>{props.subject.studentNo}</td>

        <td>
            <Link to= {"/StudentSubjectEdit/" + props.subject._id}>edit</Link> | <a href="#" onClick={() => {props.deleteStudentSubject(props.subject._id)}}>delete</a>
        </td>
    </tr>
)


class Kakarot extends Component {
    constructor(props) {
        super(props); 

        this.deleteStudentSubject = this.deleteStudentSubject.bind(this);

        this.state = {
            studentSubjects: [],
        }
    } 

    deleteStudentSubject(id){
        axios.delete('/studentSubjects/remove/' + id)
            .then( res => console.log(res.data));

        this.setState({
            studentSubjects: this.state.studentSubjects.filter(el => el._id !== id)
        })
    }


     componentDidMount(){
        axios.get('http://localhost:5000/studentSubjects/')
            .then(response => {
                this.setState({studentSubjects: response.data});
                console.log(this.state.studentSubjects);
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

     subjectList() {
        return this.state.studentSubjects.map(subject => {
            return <SubjectViewer subject={subject} deleteStudentSubject={this.deleteStudentSubject} key={subject._id} />;
        })
    }

    render() {
        return (
            <div>
                <h2>Student Subjects</h2>

                <table className = "table">
                    <thead className ="thead-light">
                        <tr>
                            
                            <th>Subject Code</th>
                            <th>Student Number</th>

                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        { this.subjectList() }
                    </tbody>
                </table>
            </div>
          );
    }

}

export default Kakarot;
