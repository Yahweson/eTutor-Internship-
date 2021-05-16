import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SubjectViewer = props =>(
    <tr>
        <td>{props.subject.subjectName}</td>
        <td>{props.subject.subjectCode}</td>
        <td>{props.subject.courseCode}</td>
            
        <td>
            <Link to= {"/SubjectEdit/" + props.subject._id}>edit</Link> | <a href="#" onClick={() => {props.deleteSubject(props.subject._id)}}>delete</a>
        </td>
    </tr>
)

class SubjectView extends Component {
    constructor(props) {
        super(props); 

        this.deleteSubject = this.deleteSubject.bind(this);

        this.state = {
            subjects: []
        }
    } 

    deleteSubject(id){
        axios.delete('/courseSubjects/remove/' + id)
            .then( res => console.log(res.data));

        this.setState({
            subjects: this.state.subjects.filter(el => el._id !== id)
        })
    }

     componentDidMount(){
        axios.get('http://localhost:5000/courseSubjects/')
            .then(response => {
                this.setState({subjects: response.data});
                console.log(this.state.subjects);
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
        return this.state.subjects.map(subject => {
            return <SubjectViewer subject={subject} deleteSubject={this.deleteSubject} key={subject._id} />;
        })
    }

    render() {
        return (
            <div>
                <h2>Course Subjects</h2>

                <table className = "table">
                    <thead className ="thead-light">
                        <tr>
                            <th>Subject Name</th>
                            <th>Subject Code</th>
                            <th>Course Code</th>
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

export default SubjectView;
