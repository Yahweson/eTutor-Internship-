import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class AddSubject extends Component {
    constructor(props) {
        super(props);

        this.onChangeSubjectName = this.onChangeSubjectName.bind(this);
        this.onChangeSubjectCode = this.onChangeSubjectCode.bind(this);
        this.onChangeCourseCode = this.onChangeCourseCode.bind(this);
        


        this.onSubmit = this.onSubmit.bind(this);


        this.state = {

            subjectName: "",
            subjectCode: "",
            courseCode: "",
            message:"",
            subjects:[],

        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/courseInfo/')
            .then(response => {
                this.setState({subjects: response.data});
                console.log(this.state.subjects);
           })
           .catch((err) => {
               console.log(err);
             });       
     }

    onChangeSubjectName(e) {
        this.setState({
            subjectName: e.target.value
        });
    }

    onChangeSubjectCode(e) {
        this.setState({
            subjectCode: e.target.value
        });
    }

    onChangeCourseCode(e) {
        this.setState({
            courseCode: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const subjectName = this.state.subjectName;
        const subjectCode = this.state.subjectCode;
        const courseCode = this.state.courseCode;
        const info = this.state.subjects;

        const subjectInfo = {
            subjectName,
            subjectCode,
            courseCode,
        }
        info.forEach((subject) =>{
            if(courseCode != subject.courseCode){
                this.setState({
                    message: "There is no course wit that code"
                });
            }else{
                if(subjectName==""||subjectCode==""||courseCode==""){
                    this.setState({
                        message: "Please enter all field"
                    });
                }else{
                    axios.post("http://localhost:5000/courseSubjects/adding/", subjectInfo, {
                    }).then(res => {
                        console.log(res)
                    });
                }       
            }
           /* if(courseCode == subject.courseCode){

                console.log("There");

                if(subjectName==""||subjectCode==""||courseCode==""){
                    this.setState({
                        message: "Please enter all field"
                    });
                }else{
                    axios.post("http://localhost:5000/courseSubjects/adding/", subjectInfo, {
                    }).then(res => {
                        console.log(res)
                    });
                }

            }else{
                this.setState({
                    message: "Please enter all field"
                });
            }*/
        })

     
         console.log(info);

        console.log({ subjectInfo });
        //   window.location = '/admin/dash';
    }

    render() {
        const {message} = this.state;
        return (
            <div>
                <p>You are on the Subject Edit Component</p>
                <p>Please populate fields to be updated</p>
                <h6>{message}</h6>
                <form onSubmit={this.onSubmit}>



                    <div className="form-group p-2 m-2">

                        <input
                            type="text"
                            className="form-control  text-center"
                            name="subjectName"
                            id="subjectName"
                            placeholder="subject name"
                            onChange={this.onChangeSubjectName}
                        />
                    </div>

                    <div className="input-group my-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                        </div>

                        <input
                            type="text"
                            className="form-control  text-center"
                            name="subjectCode"
                            id="subjectCode"
                            placeholder="subject Code"
                            onChange={this.onChangeSubjectCode}
                        />
                    </div>

                    <div className="input-group my-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                        </div>

                        <input
                            type="text"
                            className="form-control  text-center"
                            name="courseCode"
                            id="courseCode"
                            placeholder="course Code"
                            onChange={this.onChangeCourseCode}
                        />
                    </div>
                    <button type="submit" className="btn btn-outline-success btn-block text-uppercase">
                        <i className="fas fa-sign-in-alt"></i> Login </button>
                </form>
            </div>
        )
    }

}


