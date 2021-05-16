import React, {Component} from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


export default class CourseInfoEdit extends Component{
    constructor(props){
        super(props);

        this.onChangeCourseName = this.onChangeCourseName.bind(this);
        this.onChangeCourseCode = this.onChangeCourseCode.bind(this);
        this.onChangeCourseYears = this.onChangeCourseYears.bind(this);
        

        this.onSubmit = this.onSubmit.bind(this);
      

        this.state = {
            
            courseName:"",
            courseCodes:"",
            prevCourseCode:"",
            courseYears:0,

            courseInfo:[],
            
            
        }
    }


    componentDidMount(){
        axios.get('http://localhost:5000/courseInfo/' + this.props.match.params.id)
            .then(response => {
                this.setState({courseInfo: response.data});
                console.log(this.state.courseInfo);
                var {courseCode} = this.state.courseInfo;
                console.log(courseCode);
                this.setState({
                    prevCourseCode: courseCode
                });
                console.log(this.state.prevCourseCode);
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

    onChangeCourseName(e) {
        this.setState({
            courseName : e.target.value
        });
    }

    onChangeCourseCode(e){
        this.setState({
            courseCode : e.target.value
        });
    }
    onChangeCourseYears(e){
        this.setState({
            courseYears : e.target.value
        })
    }


    onSubmit(e){
        e.preventDefault();
        const courseName = this.state.courseName;
        const courseCode = this.state.courseCode;
        const courseYears = this.state.courseYears;
        const prevCourseCode = this.state.prevCourseCode;
      
        
        const coursesInfo = {
            courseName,
            courseCode,
            courseYears,
        }

        console.log(this.props.match.params.id);
        console.log(this.state.prevCourseCode);
        
        const subjectEdit = {
            courseCode,
            prevCourseCode
        }
       
        axios.post("http://localhost:5000/courseInfo/update/" + this.props.match.params.id, coursesInfo, {
        }).then(res => {
            console.log(res);
        });

        axios.post("http://localhost:5000/courseSubjects/CourseCodeUpdate" , subjectEdit, {
        }).then(res => {
            console.log(res);
        });


        console.log({coursesInfo});
     //   window.location = '/admin/dash';
    }

    render(){
        return(
            <div>
                <p>You are on the CourseInfo Edit Component</p>
                <p>Please populate fields to be updated</p>
                <form onSubmit = {this.onSubmit}>

                    

                    <div className="form-group p-2 m-2">

                        <input 
                            type="text" 
                            className="form-control  text-center" 
                            name="courseName" 
                            id="courseName" 
                            placeholder= "courseName"
                            onChange = {this.onChangeCourseName}
                        />
                    </div>

					<div className="input-group my-3">					
						<div className="input-group-prepend">
								<span className="input-group-text"><i className="fas fa-user"></i></span>
							</div>

                        <input 
                            type="text" 
                            className="form-control  text-center" 
                            name="courseCode" 
                            id="courseCode" 
                            placeholder="courseCode"
                            onChange = {this.onChangeCourseCode}
                            />
					</div>

					<div className="input-group my-3">					
						<div className="input-group-prepend">
								<span className="input-group-text"><i className="fas fa-user"></i></span>
							</div>

                        <input 
                            type="text" 
                            className="form-control  text-center" 
                            name="courseYears" 
                            id="courseYears" 
                            placeholder="courseYears"
                            onChange = {this.onChangeCourseYears}
                            />
					</div>
	
						<button type="submit" className="btn btn-outline-success btn-block text-uppercase">
							<i className="fas fa-sign-in-alt"></i> Login </button>
                </form>
            </div>
        )
    }

}


