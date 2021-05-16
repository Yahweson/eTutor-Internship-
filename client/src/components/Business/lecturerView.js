import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LecturerViewer = props => (
    <tr>
        <td>{props.currentLecturer.lecturerName}</td>
        <td>{props.currentLecturer.lecturerSurname}</td>
        <td>{props.currentLecturer.lecturerUsername}</td>

        <td>
            <Link to={"/LecturerEdit/" + props.currentLecturer._id}>edit</Link> | <a href="#" onClick={() => { props.deleteLecturerInfo(props.currentLecturer._id, props.currentLecturer.lecturerUsername) }}>delete</a>
        </td>
    </tr>
)

class LecturerView extends Component {
    constructor(props) {
        super(props);

        this.deleteLecturerInfo = this.deleteLecturerInfo.bind(this);

        this.state = {
            lecturerInfo: [],
            lecturerSubjects: [],
        }
    }

    deleteLecturerInfo(id, code) {
        axios.delete('/lecturerInfo/remove/' + id)
            .then( res => console.log(res.data));

        this.setState({
            lecturerInfo: this.state.lecturerInfo.filter(el => el._id !== id)
        });

        axios.delete('/lecturerSubjects/removing/' + code)
            .then(res => console.log(res.data));

        this.setState({
            lecturerSubjects: this.state.lecturerSubjects.filter(el => el._id !== id)
        });
    }

    componentDidMount() {
        axios.get('http://localhost:5000/lecturerInfo/')
            .then(response => {
                this.setState({ lecturerInfo: response.data });
                console.log(this.state.lecturerInfo);
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get('http://localhost:5000/lecturerSubjects/')
            .then(response => {
                this.setState({ lecturerSubjects: response.data });
                console.log(this.state.lecturerSubjects);
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
        return this.state.lecturerInfo.map(currentLecturer => {
            return <LecturerViewer currentLecturer={currentLecturer} deleteLecturerInfo={this.currentLecturer} key={currentLecturer._id} />;
        })
    }

    render() {
        return (
            <div>
                <h2>Course Info</h2>

                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>LecturerName</th>
                            <th>LecturerSurname</th>
                            <th>LecturerUsername</th>
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

export default LecturerView;
