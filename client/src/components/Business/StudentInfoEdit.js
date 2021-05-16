import React, {Component} from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class StudentInfoEdit extends Component{
    constructor(props){
        super(props);

        this.onChangeStudentNo = this.onChangeStudentNo.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        

        this.onSubmit = this.onSubmit.bind(this);
      

        this.state = {
            
            studentNo:"",
            password:"",
            prevStudentNo:"",
            studentInfo:[],
            studentSubjects:[],
            
            
        }
    }


    onChangePassword(e) {
        this.setState({
            password : e.target.value
        });
    }

    onChangeStudentNo(e){
        this.setState({
            studentNo : e.target.value
        });
    }

    componentDidMount(){
        axios.get('http://localhost:5000/studentInfo/' + this.props.match.params.id)
            .then(response => {
                this.setState({studentInfo: response.data});
                console.log(this.state.studentInfo);
                var {studentNo} = this.state.studentInfo;
                console.log(studentNo);

                this.setState({
                    prevStudentNo: studentNo
                });
                console.log(this.state.prevStudentNo);
           })
           .catch((err) => {
               console.log(err);
             });    

            
           // const url ="http://localhost:5000/patients/";
            //const response = await fetch(url);
            //const data = await response.json();
            //this.setState({
             // patients: data.results[0]    
           // });    
     }

    onSubmit(e){
        e.preventDefault();
        const studentNo = this.state.studentNo;
        const password = this.state.password;
        const prevStudentNo = this.state.prevStudentNo;

        const studentInfo = {
            studentNo,
            password,
        }

       // console.log(this.props.match.params.id);
        //console.log(studentNo);

        axios.post("http://localhost:5000/studentInfo/update/" + this.props.match.params.id, studentInfo, {
        }).then(res => {
            console.log(res)
        });

        const studentSubjectsInfo = {
            studentNo,
            password,
            prevStudentNo,
        }
        axios.post("http://localhost:5000/studentSubjects/StudentNoUpdate" , studentSubjectsInfo, {
        }).then(res => {
            console.log(res);
        });

        console.log({studentInfo});
     //   window.location = '/admin/dash';
    }


    
    render(){
        var {studentNo} = this.state;
        return(
            <div>
                <p>You are on the StudentInfo Edit Component</p>
                <p>Please populate fields to be updated</p>
                <form onSubmit = {this.onSubmit}>

                    

                    <div className="form-group p-2 m-2">

                        <input 
                            type="text" 
                            className="form-control  text-center" 
                            name="studentNo" 
                            id="studentNo" 
                            placeholder="studentNo"
                            onChange = {this.onChangeStudentNo}
                        />
                    </div>

					<div className="input-group my-3">					
						<div className="input-group-prepend">
								<span className="input-group-text"><i className="fas fa-user"></i></span>
							</div>

                        <input 
                            type="text" 
                            className="form-control  text-center" 
                            name="password" 
                            id="password" 
                            placeholder="password"
                            onChange = {this.onChangePassword}
                            />
					</div>
                    <Link to={"/StudentSubjctView/" + this.state.prevStudentNo}>View and edit Student Subjects</Link>
						<button type="submit" className="btn btn-outline-success btn-block text-uppercase">
							<i className="fas fa-sign-in-alt"></i> Login </button>
                </form>
            </div>
        )
    }

}


