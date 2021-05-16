import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class AdminUser extends Component{
    constructor(props){
        super(props);

        this.state = {
            message:""
        }
    }
    continue = e => {
        e.preventDefault();
        

        const {values} = this.props;
        const {adminUsername} = values;
        const {adminPassword} =  values;
        const {adminConfirmPassword} =values;
        
        if(adminUsername == "" || adminPassword =="" || adminConfirmPassword == ""){
            this.setState({
                message : "Please enter All Creadentials"
            })
        }else if(adminPassword == adminConfirmPassword){
            this.props.nextStep();
        }       
        else{
            this.setState({
                message: "Passwords do not match"
            });
        }
    }  


    render(){
        var {message} = this.state;
        const {values,handleChange} = this.props;
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="d-flex justify-content-center">
                            <Link to={"/AdminDash/" + this.props.params.match.id} className="btn btn-info text-uppercase">Back</Link>

                        </div>
                    </div>
                </div>
                <h4>{message}</h4>
                <p>You are on the Admin Add Component</p>
                <form onSubmit = {this.onSubmit}>
	
                <label>Admin Username</label>
					<div className="input-group my-3 text-center">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-lock"></i></span>
						</div>
					
                        <input 
                        type="text" 
                        className="form-control  text-center" 
                        name="AdminUserName" 
                        id="AdminUserName" 
                        placeholder="AdminUserName"
                        onChange ={handleChange('adminUsername')}
                        
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
                        placeholder="password"
                        onChange ={handleChange('adminPassword')}
                        
                        />
					</div>

                    <label>Confirm Password</label>
                    <div className="input-group my-3 text-center">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-lock"></i></span>
						</div>
					
                        <input 
                        type="text" 
                        className="form-control text-center" 
                        name="confirmPassword" 
                        id="confirmPassword" 
                        placeholder="confirmPassword"
                        onChange ={handleChange('adminConfirmPassword')}
                        
                        />
					</div>

						<button type="submit" onClick ={this.continue} className="btn btn-outline-success btn-block text-uppercase">
							<i className="fas fa-sign-in-alt"></i> Confirm </button>
				</form>
            </div>
        )
    }

}


