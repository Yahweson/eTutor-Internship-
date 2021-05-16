import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//importing AdminUser component
import AdminUser from './AdminUser'

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class AdminAdd extends Component{
    constructor(props){
        super(props);

        this.state = {
            step : 1,
            adminUsername :"",
            adminPassword: "",
            adminConfirmPassword:"",
            message : "",
            
        }
    }
    //Send state to api
    apiSend = e =>{
        e.preventDefault();
        const adminUsername  = this.state.adminUsername;
        const   adminPassword  = this.state.adminPassword;
        const  adminConfirmPassword  = this.state.adminConfirmPassword;

        if(adminConfirmPassword === adminPassword){

            const adminInfo ={
                adminUsername, 
                adminPassword       
            }

            
            axios.post("http://localhost:5000/adminInfo/add", adminInfo, {
            }).then(res => {
                console.log(res)
            });
        }else{
            this.setState({
                messsage: "Passwords do not match"
            })
        }


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
        this.setState({ [input]: e.target.value });
    }

    render(){
        const {step} = this.state;
    
        const {adminUsername, adminPassword, adminConfirmPassword} = this.state;
        const values = {adminUsername, adminPassword, adminConfirmPassword};
        switch(step){
            case 1:
                return(
                    <AdminUser
                        nextStep ={this.nextStep}                        
                        handleChange = { this.handleChange}
                        values = {values}
                    />
                )

            case 2 : 
                    return(
                        
                        <div>
                            <h1>Okay</h1>
                            <p>{adminUsername}</p>
                            <p>{adminPassword}</p>

                            <button type="submit" onClick={this.apiSend} className="btn btn-outline-success btn-block text-uppercase">
							<i className="fas fa-sign-in-alt"></i> Confirm</button>
                        </div>
                        
                    )                 
        }
    }

}


