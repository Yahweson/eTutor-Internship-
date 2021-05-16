import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class ChangeDefaultPassword extends Component {
    constructor(props) {
        super(props);

        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        

        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
 
            password: "",
            confirmPassword: "",
            message:"",

        }
    }

    componentDidMount() {

    }


    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const confirmed = this.state.confirmPassword;
        const password = this.state.password;
        const studentNo = 0;
     
        const info  = {
            password,
          //  studentNo
        }
        if (confirmed === password){
            this.setState({
                message:"Confirmed"
            });

            axios.post("http://localhost:5000/adminInfo/update/" + this.props.match.params.id, info, {
            }).then(res => {
                console.log(res)
            });

            window.location = '/Admin/dash/'+this.props.match.params.id;
        }else{
            this.setState({
                message : "Passwords do not match"
            });
        }
        const person = {
    
        }
       
        console.log({ person });
        //   window.location = '/admin/dash';
    }

    render() {
        const {message} = this.state;
        return (
            <div>
                <p>You are on the ChangeDefaultPassword Component</p>
                <h6>{message}</h6>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group p-2 m-2">

                        <input
                            type="password"
                            className="form-control  text-center"
                            name="password"
                            id="password"
                            placeholder="Confirm Password"
                            onChange={this.onChangeConfirmPassword}
                        />
                    </div>

                    <div className="input-group my-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                        </div>

                        <input
                            type="password"
                            className="form-control  text-center"
                            name="password"
                            id="Gpassword"
                            placeholder="password"
                            onChange={this.onChangePassword}
                        />
                    </div>


                    <button type="submit" className="btn btn-outline-success btn-block text-uppercase">
                        <i className="fas fa-sign-in-alt"></i> Login </button>
                </form>
            </div>
        )
    }

}


