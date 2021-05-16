import React, {Component} from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import axios from 'axios';

export default class PatientLogin extends Component{
    constructor(props){
        super(props);

        this.checkAdmins = this.checkAdmins.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
      

        this.state = {
            admins: [],
            patients: [] ,
            password:"",
            username:"",
            
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/patients/')
        .then(response => {
            this.setState({patients: response.data});
       })
       .catch((err) => {
           console.log(err);
         });

         //
         axios.get('http://localhost:5000/admin/')
         .then(response => {
             this.setState({admins: response.data});
        })
        .catch((err) => {
            console.log(err);
          });
    }

    checkAdmins(){
        const patient = {
            username: this.state.username,
            password: this.state.password,
        }

        this.state.admins.map(admin => {
            console.log(admin.username);
            if(admin.username === this.state.username){
               
                axios.post('http://localhost:5000/admin/login', patient)
                   .then(res => {
                       if(res.data === 'Correct password Admin'){
                            console.log('username found at admins');
                            alert('Correct admin passwords');
                            window.location = '/admin/Dash';
                       }
                       else if(res.data === 'Incorrect password Admin'){
                        console.log('Incorrect admin password');
                        alert('Incorrect admin password');
                       }
                   });
                //window.location = '/admin/Dash';
            }
        });

        //
        this.state.patients.map(patient => {
            if(patient.username === this.state.username){
               
                axios.post('http://localhost:5000/patients/login', patient)
                   .then(res => {
                       if(res.data === 'Correct password entered'){
                            console.log('username found at patients');
                            alert('Correct admin passwords');
                            window.location = '/admin/Dash';
                       }
                       else if(res.data === 'Incorrect password'){
                        console.log('Incorrect admin password');
                        alert('Incorrect admin password');
                       }
                   });
                //window.location = '/admin/Dash';
            }
        });
    }

    onChangeUsername(e){
        this.setState({
            username : e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password : e.target.value
        });
    }


    onSubmit(e){
        e.preventDefault();

        const patient = {
            username: this.state.username,
            password: this.state.password,
 
        }

        //    if(patient){

        //        axios.post('http://localhost:5000/patients/login', patient)
        //        .then(window.location = '/patient/patientDash');
        //    }else
        //    {
        //        axios.post('http://localhost:5000/admin/login', patient)
        //        .then(window.location = '/admin/dash');
        //    }
                
        this.checkAdmins();
            
                
            
    


    console.log({patient});
     //   window.location = '/admin/dash';
    }

    render(){
        return(
            <div>                
                <p>You are on the Patient Login Component</p>
                <form onSubmit={this.onSubmit}>
					<div className="input-group py-3 y-2">
							<div className="input-group-prepend">
								<span className="input-group-text"><i className="fas fa-user"></i></span>
							</div>

                            <input 
                                type="text"
                                onChange = {this.onChangeUsername} 
                                className="form-control  text-center p-0 w-4" 
                                name="usernam" 
                                id="username" 
                                placeholder=" username"
                                />
					</div>


					<div className="input-group my-3">					
						<div className="input-group-prepend">
								<span className="input-group-text"><i className="fas fa-user"></i></span>
							</div>

                        <input 
                            type="text" 
                            onChange = {this.onChangePassword}
                            className="form-control  text-center" 
                            name="surname" 
                            id="surname" 
                            placeholder="password"
                            />
					</div>
	
					                            

						<button type="submit" className="btn btn-outline-success btn-block text-uppercase">
							<i className="fas fa-sign-in-alt"></i> Login </button>
				</form>
            </div>
        )
    }

}


