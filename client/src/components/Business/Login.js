import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onValueChange = this.onValueChange.bind(this);

        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            persons: [],
            student: [],
            lecturer: [],
            admin: [],
            password: "",
            value: "",
            studentNo: 0,
            message: "",
            selectedOption: "",

        }
    }

    componentDidMount() {
        //Get student Info
        axios.get('http://localhost:5000/studentInfo/')
            .then(response => {
                this.setState({ student: response.data });
                console.log("fetched");
                console.log(this.state.student);
            })
            .catch((err) => {
                console.log(err);
            });

        //Get Lecturer Info
        axios.get('http://localhost:5000/lecturerInfo/')
            .then(response => {
                this.setState({ lecturer: response.data });
                console.log("fetched");
                console.log(this.state.lecturer);
            })
            .catch((err) => {
                console.log(err);
            });
        //get Admin Info
        axios.get('http://localhost:5000/AdminInfo/')
            .then(response => {
                this.setState({ admin: response.data });
                console.log("fetched");
                console.log(this.state.admin);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    onValueChange(e) {
        this.setState({
            selectedOption: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeUsername(e) {
        this.setState({
            value: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const options = this.state.selectedOption;
        const students = this.state.student;
        const lecturer = this.state.lecturer;
        const admin = this.state.admin;

        const password = this.state.password;

        const value = this.state.value;
        const studentNo = Number(value);
        if (options === "Student") {

            const foundStudent = students.find((studentId) => {

                if (studentId.studentNo === studentNo) {
                    console.log("Found student");
                    if (studentId.password === password) {

                        if (studentId.password === "12345") {
                            window.location = '/ChangeDefaultPasswordStudent/' + studentId._id;
                        }
                        else {
                            window.location = '/StudentDash/' + studentId._id;
                        }
                    } else {
                        this.setState({
                            message: "Incorrect password"
                        });
                    }
                } else {
                    console.log("Password Incorrect");
                }
            });
        } else if (options === "Lecturer") {
            const lecturerFound = lecturer.find((lecturerId) => {

                if (lecturerId.lecturerUsername === value) {
                    console.log("Found lecturer");
                    if (lecturerId.password === password) {

                        if (lecturerId.password === "12345") {
                            window.location = '/ChangeDefaultPasswordLecturer/' + lecturerId._id;
                        }
                        else {
                            window.location = '/LecturerDash/' + lecturerId._id;
                        }
                    } else {
                        this.setState({
                            message: "Incorrect password"
                        });
                    }
                }
            });
        } else if (options === "Other") {
            const adminFound = admin.find((adminId) => {

                if (adminId.username === value) {
                    console.log("Found Admi");
                    if (adminId.password === password) {

                        if (adminId.password === "12345") {
                            window.location = '/ChangeDefaultPasswordAdmin/' + adminId._id;
                        }
                        else {
                            window.location = '/admin/dash/' + adminId._id;
                        }
                    } else {
                        this.setState({
                            message: "Incorrect password"
                        });
                    }
                }
            });
        } else {
            this.setState({
                message: "Please confirm that you are registered"
            })
        }


        const person = {
            /*  email : this.state.email,
              username: this.state.username,
                      password: this.state.password,*/
            StudentNo: studentNo,
            selectedOption: this.state.selectedOption
        }


        var radios = this.state.selectedOption;
        /*
        switch (radios) {
            case 'student' :
            axios.post('http://localhost:5000/student/', person)
            .then(res => console.log(res.data));
                break;

                case 'Lecturer':
                axios.post('http://localhost:5000/Lectures/', person)
                .then(res => console.log(res.data));
                break;

                case 'Other':
                axios.post('http://localhost:5000/Admin/', person)
                .then(res => console.log(res.data));
                break;
        
            default:
                    console.log("Incorrect Credentials");
                break;
        }
*/

        console.log({ person });
        //   window.location = '/admin/dash';
    }

    render() {

        const { message } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 my-3">
                        <p>You are on the Login Component</p>
                        <h6>{message}</h6>
                        <form onSubmit={this.onSubmit}>

                            <div className="radio">
                                <label>
                                    <input
                                        type="radio"
                                        value="Student"
                                        checked={this.state.selectedOption === "Student"}
                                        onChange={this.onValueChange}
                                    />
                                    Student
                        </label>
                            </div>

                            <div className="radio">
                                <label>
                                    <input
                                        type="radio"
                                        value="Lecturer"
                                        checked={this.state.selectedOption === "Lecturer"}
                                        onChange={this.onValueChange}
                                    />
                                    Lecturer
                        </label>
                            </div>

                            <div className="radio">
                                <label>
                                    <input
                                        type="radio"
                                        value="Other"
                                        checked={this.state.selectedOption === "Other"}
                                        onChange={this.onValueChange}
                                    />
                                    Other
                        </label>
                            </div>

                            <div className="form-group px-5 ">

                                <input
                                    type="text"
                                    className="form-control  text-center"
                                    name="username"
                                    id="username"
                                    placeholder="username"
                                    onChange={this.onChangeUsername}
                                />
                            </div>

                            <div className="form-group px-5">
                                <input
                                    type="password"
                                    className="form-control text-center"
                                    name="password"
                                    id="password"
                                    placeholder="password"
                                    onChange={this.onChangePassword}
                                />
                            </div>


                            <button type="submit" className="btn btn-outline-success btn-block text-uppercase m-2 p-2">
                                <i className="fas fa-sign-in-alt"></i> Login </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

