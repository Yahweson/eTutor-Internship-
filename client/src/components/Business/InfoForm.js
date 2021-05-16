import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class InfoForm extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            message : ""
        }
    }

    continue = e => {
        e.preventDefault();
        const {values} = this.props;
        const {courseName} = values;
        const {courseCode}  =values;
        const {courseYears} = values;
        const {subjectNo} = values;

        if(courseName == "" || courseCode == "" || courseYears == 0 || subjectNo == 0){   
            this.setState({
                message:"Please Enter all credentials"
            });
        }else{
            this.props.nextStep();
        }
        

    }    
    
    render(){
        const {values,handleChange} = this.props;
        var {message} = this.state;

        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="d-flex justify-content-center">
                            <Link to={"/AdminCourses/" + this.props.match.params.id} className="btn btn-info text-uppercase">Back</Link>

                        </div>
                    </div>
                </div>
                <h4>{message}</h4>
                <p>You are on the Admin Subject Add Component</p>
                <form onSubmit = {this.onSubmit}>
	
                <label>Course Name</label>
					<div className="input-group my-3 text-center">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-lock"></i></span>
						</div>
					
                        <input 
                        type="text" 
                        className="form-control text-center" 
                        name="courseName" 
                        id="courseName" 
                        placeholder="courseName"
                        onChange ={handleChange('courseName')}
                        defaultValue = {values.courseName}
                        />
					</div>

					<label>Course Code</label>
                    <div className="input-group my-3 text-center">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-lock"></i></span>
						</div>
					
                        <input 
                        type="text" 
                        className="form-control text-center" 
                        name="courseCode" 
                        id="courseCode" 
                        placeholder="courseCode"
                        onChange ={handleChange('courseCode')}
                        defaultValue = {values.courseCode}
                        />
					</div>

                    <label>Course Years</label>
                    <div className="input-group my-3 text-center">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-lock"></i></span>
						</div>
					
                        <input 
                        type="text" 
                        className="form-control text-center" 
                        name="courseYears" 
                        id="courseYears" 
                        placeholder="courseYears"
                        onChange ={handleChange('courseYears')}
                        defaultValue = {values.courseYears}
                        />
					</div>

                    <label>Total Subjects in the Course</label>
                    <div className="input-group my-3 text-center">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-lock"></i></span>
						</div>
					
                        <input 
                        type="text" 
                        className="form-control text-center" 
                        name="subjectNO" 
                        id="subjectNo" 
                        placeholder="Total number of subjects in Course"
                        onChange ={handleChange('subjectNo')}
                        defaultValue = {values.subjectNo}
                        />
					</div>


						<button type="submit" onClick={this.continue} className="btn btn-outline-success btn-block text-uppercase">
							<i className="fas fa-sign-in-alt"></i> continue</button>
				</form>
            </div>
        )
    }

}

