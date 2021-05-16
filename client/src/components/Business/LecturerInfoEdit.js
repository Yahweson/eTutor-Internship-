import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class LecturerInfoEdit extends Component {
    constructor(props) {
        super(props);

        this.onChangeLecturerName = this.onChangeLecturerName.bind(this);
        this.onChangeLecturerSurname = this.onChangeLecturerSurname.bind(this);
        this.onChangeLecturerUsername = this.onChangeLecturerUsername.bind(this);
        this.onChangeLecturerPassword = this.onChangeLecturerPassword.bind(this);


        this.onSubmit = this.onSubmit.bind(this);


        this.state = {

            lecturerName: "",
            lecturerSurname: "",
            lecturerUsername: "",
            lecturerPassword: "",
            prevLecturerUsername: "",

            courseYears: 0,

            lecturerInfo: [],


        }
    }


    componentDidMount() {
        axios.get('http://localhost:5000/lecturerInfo/' + this.props.match.params.id)
            .then(response => {
                this.setState({ lecturerInfo: response.data });
                console.log(this.state.lecturerInfo);

                var { lecturerUsername } = this.state.lecturerInfo;
                console.log(lecturerUsername);

                this.setState({
                    prevLecturerUsername: lecturerUsername
                });
                console.log(this.state.prevLecturerUsername);
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

    onChangeLecturerName(e) {
        this.setState({
            lecturerName: e.target.value
        });
    }

    onChangeLecturerSurname(e) {
        this.setState({
            lecturerSurname: e.target.value
        });
    }

    onChangeLecturerUsername(e) {
        this.setState({
            lecturerUsername: e.target.value
        })
    }

    onChangeLecturerPassword(e) {
        this.setState({
            lecturerPassword: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();
        const lecturerName = this.state.lecturerName;
        const lecturerSurname = this.state.lecturerSurname;
        const lecturerUsername = this.state.lecturerUsername;
        const lecturerPassword = this.state.lecturerPassword;

        const prevLecturerUsername = this.state.prevLecturerUsername;


        const lecturersInfo = {
            lecturerName,
            lecturerSurname,
            lecturerUsername,
            lecturerPassword,
        }

        console.log(this.props.match.params.id);
        console.log(this.state.prevLecturerUsername);

        const lecturerSubjectEdit = {
            lecturerUsername,
            prevLecturerUsername
        }

        console.log(lecturersInfo);
        console.log(lecturerSubjectEdit);
         axios.post("http://localhost:5000/lecturerInfo/update/" + this.props.match.params.id, lecturersInfo, {
         }).then(res => {
             console.log(res);
         });

         axios.post("http://localhost:5000/lecturerSubjects/LecturerUsernameUpdate" , lecturerSubjectEdit, {
         }).then(res => {
             console.log(res);
         });


        console.log({ lecturersInfo });
        //   window.location = '/admin/dash';
    }

    render() {
        return (
            <div>
                <p>You are on the LecturerInfo Edit Component</p>
                <p>Please populate fields to be updated</p>
                <form onSubmit={this.onSubmit}>
                    <label>Lecturer Name</label>
                    <div className="input-group my-3 text-center">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-lock"></i></span>
                        </div>

                        <input
                            type="text"
                            className="form-control text-center"
                            name="LectureName"
                            id="LectureName"
                            placeholder="Lecture Name"
                            onChange={this.onChangeLecturerName}
                            
                        />
                    </div>

                    <label>Lecturer Surname</label>
                    <div className="input-group my-3 text-center">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-lock"></i></span>
                        </div>

                        <input
                            type="text"
                            className="form-control text-center"
                            name="LectureSurName"
                            id="LectureSurName"
                            placeholder="Lecturer Surname"
                            onChange={this.onChangeLecturerSurname}
                            
                        />
                    </div>


                    <label>LectureUsername</label>
                    <div className="input-group my-3 text-center">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-lock"></i></span>
                        </div>

                        <input
                            type="text"
                            className="form-control text-center"
                            name="LectureUsername"
                            id="LectureUsername"
                            placeholder="LectureUsername"
                            onChange={this.onChangeLecturerUsername}
                            
                        />
                    </div>

                    <label>Password</label>
                    <div className="input-group my-3 text-center">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-lock"></i></span>
                        </div>

                        <input
                            type="text"
                            className="form-control text-center"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={this.onChangeLecturerPassword}
                            
                        />
                    </div>
                    <button type="submit" className="btn btn-outline-success btn-block text-uppercase">
                        <i className="fas fa-sign-in-alt"></i> Login </button>
                </form>
            </div>
        )
    }

}


