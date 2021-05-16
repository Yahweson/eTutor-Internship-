import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentViewer = props => (
    <tr>
        <td>{props.currentStudent.studentNo}</td>
        <td>{props.currentStudent.password}</td>
        <td>
            <Link to={"/StudentSubjctView/" + props.currentStudent.studentNo}>View Subjects</Link>
        </td>     
        <td>
            <Link to={"/StudentEdit/" + props.currentStudent._id}>edit</Link> | <a href="#" onClick={() => { props.deleteStudentInfo(props.currentStudent._id, props.currentStudent.studentNo) }}>delete</a>
        </td>
    </tr>
)

class StudentView extends Component {
    constructor(props) {
        super(props);

        this.deleteStudentInfo = this.deleteStudentInfo.bind(this);

        this.state = {
            studentInfo: [],
            studentSubjects: [],
        }
    }

    deleteStudentInfo(id, code) {
        axios.delete('/studentInfo/remove/' + id)
            .then( res => console.log(res.data));

        this.setState({
            studentInfo: this.state.studentInfo.filter(el => el._id !== id)
        });

        axios.delete('/studentSubjects/removing/' + code)
            .then(res => console.log(res.data));

        this.setState({
            studentSubjects: this.state.studentSubjects.filter(el => el._id !== id)
        });
    }

    componentDidMount() {
        axios.get('http://localhost:5000/studentInfo/')
            .then(response => {
                this.setState({ studentInfo: response.data });
                console.log(this.state.studentInfo);
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get('http://localhost:5000/studentSubjects/')
            .then(response => {
                this.setState({ studentSubjects: response.data });
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

    lecturerInfoList() {
        return this.state.studentInfo.map(currentStudent => {
            return <StudentViewer currentStudent={currentStudent} deleteStudentInfo={this.deleteStudentInfo} key={currentStudent._id} />;
        })
    }

    render() {
        return (
            <div>
                <h2>Student Info</h2>

                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Student Number</th>
                            <th>Student Password</th>
                            <th>Subjects</th>
                            
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.lecturerInfoList()}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default StudentView;
