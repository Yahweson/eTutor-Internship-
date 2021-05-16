import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//Importing lectureInfoAdd component
import LecturerInfoForm from './LecturerInfoForm';
import LectureSubjectAdd from './LecturerSubjectAdd';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class LecturerAdd extends Component{
    constructor(props){
        super(props);

        this.state = {
            step:1,
            lecturerName :"",
            lecturerSurname :"",
            lecturerUsername :"",
            password : "12345",
            subjectNo: 0,
            subjectCode:"",
            subCount:0,
            subjectName:[],

        }
    }
    
    //send to api
    apiSend = e => {
        const info = {
            lecturerName: this.state.lecturerName,
            lecturerSurname: this.state.lecturerSurname,
            lecturerUsername: this.state.lecturerUsername,
            password: this.state.password,
        }

        axios.post("http://localhost:5000/lecturerInfo/add", info, {
        }).then(res => {
            console.log(res)
        });

        console.log()
        const lecturerSubject = {
            lecturerUsername: this.state.lecturerUsername,
            subjectName: this.state.subjectName
        }
        axios.post("http://localhost:5000/lecturerSubjects/add", lecturerSubject, {
        }).then(res => {
            console.log(res)
        });

        window.location('/AdminLecturer/' + this.props.macth.params.id);
    }
    //Increase subject count
    nextSubj = () => {
        const { subCount } = this.state;
        this.setState({
            subCount: subCount + 1
        });

        this.state.subjectName.push(this.state.subjectCode);
        
    }

    //Decrease subject count
    prevSubj = () => {
        const { subCount } = this.state;
        if (subCount > 0) {
            this.setState({
                subCount: subCount - 1
            });
        }

        this.state.subjectName.pop(this.state.subjectCode);

    }
    //Proceed to next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }
    //Proceed to previous step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    //To handle form changes
    handleChange = input => e => {
        this.setState({[input] : e.target.value});
    }

    render(){
        const {step} = this.state;
    
        const {lecturerName, lecturerSurname, lecturerUsername,subjectNo,subjectName,subjectCode, subCount} = this.state;
        const values = {lecturerName ,lecturerSurname ,lecturerUsername ,subjectNo,subjectName,subjectCode,subCount};
        switch(step){
            case 1:
                return(
                    <LecturerInfoForm
                        nextStep ={this.nextStep}                        
                        handleChange = { this.handleChange}
                        values = {values}
                    />
                )
             
            case 2:
                return(
                    <LectureSubjectAdd
                        nextStep ={this.nextStep}
                        nextSubj = {this.nextSubj}
                        prevSubj = {this.prevSubj}
                        handleChange = { this.handleChange}
                        values = {values}
                    />
                )
            case 3 : 
                    return(
                        
                        <div>
                            <h1>Okay</h1>
                            <p>{lecturerName}</p>
                            <p>{lecturerSurname}</p>
                            <p>{lecturerUsername}</p>
                            <p>{subjectName}</p>
                            <button type="submit" onClick={this.apiSend} className="btn btn-outline-success btn-block text-uppercase">
							<i className="fas fa-sign-in-alt"></i> Confirm</button>
                        </div>
                        
                    )                 
        }
    }

}


