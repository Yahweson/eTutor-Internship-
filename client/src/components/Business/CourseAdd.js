import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//import components
import InfoForm from './InfoForm';
import SubjectAdd from './InfoFormSubjects';

//importing frameworks
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';



export default class CourseAdd extends Component{
    constructor(props){
        super(props);

        this.state = {
            step:1,
            courseCode :"",
            courseName:"",
            courseYears:0,
            subjectNo: 0,
            subCount:0,
            panana: "",
            papple:"",
            

            subjectName: [],
            subjectCode:[]
        }
    }
    //send to api
    apiSend = e =>{
        const info ={
            courseCode : this.state.courseCode,
            courseName : this.state.courseName,
            courseYears : this.state.courseYears,
            subjectNo : this.state.subjectNo,
        }
        e.preventDefault();
        axios.post("http://localhost:5000/courseInfo/add", info, {
        }).then(res => {
            console.log(res)
        });

        const courseSubjects = {
            subjectName : this.state.subjectName,
            subjectCode : this.state.subjectCode,
            courseCode : this.state.courseCode,
        }

        axios.post("http://localhost:5000/courseSubjects/add", courseSubjects, {
        }).then(res => {
            console.log(res)
        });
    }
    //Increase subject count
    nextSubj = () => {
        const { subCount } = this.state;
        this.setState({
            subCount: subCount + 1
        });

        this.state.subjectName.push(this.state.panana);
        this.state.subjectCode.push(this.state.papple);
    }

        //Decrease subject count
        prevSubj = () => {
            const { subCount } = this.state;
            if(subCount >0){
                this.setState({
                    subCount: subCount - 1
                });
            }

            this.state.subjectName.pop(this.state.panana);
            this.state.subjectCode.pop(this.state.papple);
            
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
/*
    //To submit the form
    onSubmit(e){
        e.preventDefault();

       const appointment = {
            idNumber: this.state.idNumber,
            symptoms: this.state.symptoms,
            status: this.state.status,
            date: this.state.date,
            time: this.state.time,
        }
        
        axios.post('http://localhost:5000/appointment/add', appointment)
            .then(res => console.log(res.data));

    }
*/


    render(){
        const {step} = this.state;
    
        const {courseCode, courseName, courseYears,subjectNo,subjectName,subjectCode, subCount, panana, papple} = this.state;
        const values = {courseCode ,courseName ,courseYears ,subjectNo,subjectName,subjectCode,subCount, panana, papple};
   
        switch(step){
            case 1:
                return(
                    <InfoForm
                        nextStep ={this.nextStep}                        
                        handleChange = { this.handleChange}
                        values = {values}
                    />
                )
                    break;

            case 2:
                return(
                    <SubjectAdd
                        nextStep ={this.nextStep}
                        nextSubj = {this.nextSubj}
                        prevSubj = {this.prevSubj}
                        handleChange = { this.handleChange}
                        values = {values}
                    />
                )
                break;
            case 3 : 
                    return(
                        
                        <div>
                            <h1>Okay</h1>
                            <p>{courseName}</p>
                            <p>{courseCode}</p>
                            <p>{subjectName}</p>
                            <p>{subjectCode}</p>
                            
                            <button type="submit" onClick={this.apiSend} className="btn btn-outline-success btn-block text-uppercase">
							<i className="fas fa-sign-in-alt"></i> Confirm</button>
                        </div>
                        
                    )  
                    break;
            case 4 : return(
                <div>
                    <h4>Hi</h4>
                </div>
            )               
        }
    }

}


