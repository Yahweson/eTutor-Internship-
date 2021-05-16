import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class MakeAppointment extends Component{
    constructor(props){
        super(props);


        this.onChangeStudentNo = this.onChangeStudentNo.bind(this);
        this.onChangeSubjectNo = this.onChangeSubjectNo.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            studentNo :"",
            subjectNo: 0,

            student: [] 
        }
    }

    conmponentDidMount(){

    }

    onChangeStudentNo(e){
        this.setState({
            studentNo : e.target.value
        });
    }

    onChangeSubjectNo(e) {
        this.setState({
            subjectNo : e.target.value
        });
    }

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

    render(){
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="d-flex justify-content-center">
                            <Link to="/AdminStudent/" className="btn btn-info text-uppercase">Back</Link>

                        </div>
                    </div>
                </div>
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
                        placeholder="StudentNo-number"
                        onChange ={this.onChangeStudentNo}
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
                        onChange ={this.onChangeStudentNo}
                        />
					</div>


						<button type="submit" className="btn btn-outline-success btn-block text-uppercase">
							<i className="fas fa-sign-in-alt"></i> Next</button>
				</form>
            </div>
        )
    }

}


