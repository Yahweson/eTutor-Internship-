import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class InfoStudentAdd extends Component{
    constructor(props){
        super(props);

        this.state ={
            message: ""
        }
    }

    continue = e => {
        e.preventDefault();
        const {values} = this.props;
        const {studentNo,subjectNo} = values;

        if (studentNo == "" || subjectNo == "") {
            this.setState({
                message : "Please enter all credentials"
            });
        } else {
            this.props.nextStep();
        }
        

    }  

 

    render(){
        const {message} = this.state;
        const {values,handleChange} = this.props;
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="d-flex justify-content-center">
                            <Link to="/AdminStudent/" className="btn btn-info text-uppercase">Back</Link>

                        </div>
                    </div>
                </div>
                <h4>{message}</h4>
                <p>You are on the Admin Student Add Component</p>
                <form onSubmit = {this.onSubmit}>
	
                <label>StudentNo</label>
					<div className="input-group my-3 text-center">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-lock"></i></span>
						</div>
					
                        <input 
                        type="text" 
                        className="form-control text-center" 
                        name="StudentNo" 
                        id="StudentNo" 
                        placeholder="StudentNo"
                        onChange={handleChange('studentNo')}
                        />
					</div>

					<label>subjectNo</label>
                    <div className="input-group my-3 text-center">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-lock"></i></span>
						</div>
					
                        <input 
                        type="text" 
                        className="form-control text-center" 
                        name="SubjectNo" 
                        id="SubjectNo" 
                        placeholder="SubjectNo"
                        onChange={handleChange('subjectNo')}
                        />
					</div>


						<button type="submit" onClick={this.continue} className="btn btn-outline-success btn-block text-uppercase">
							<i className="fas fa-sign-in-alt"></i> Next</button>
				</form>
            </div>
        )
    }

}


