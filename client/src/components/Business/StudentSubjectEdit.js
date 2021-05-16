import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class StudentSubjectEdit extends Component {
    constructor(props) {
        super(props);

        this.onChangeSubjectCode = this.onChangeSubjectCode.bind(this);
        


        this.onSubmit = this.onSubmit.bind(this);


        this.state = {

            subjectCode: "",
            subjects: [],


        }
    }


    onChangeSubjectCode(e) {
        this.setState({
            subjectCode: e.target.value
        });
    }

    conmponentDidMount() {

        axios.get('http://localhost:5000/courseSubjects/')
            .then(response => {
                this.setState({ subjects: response.data });
                console.log(this.state.subjects);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    onSubmit(e) {
        e.preventDefault();
        
        const subjectCode = this.state.subjectCode;


        const subjectInfo = {
            subjectCode,
        }

        console.log(this.props.match.params.id);
        // console.log(username);
        axios.post("http://localhost:5000/studentSubjects/update/" + this.props.match.params.id, subjectInfo, {
        }).then(res => {
            console.log(res)
        });


        console.log({ subjectInfo });
        //   window.location = '/admin/dash';
    }

    render() {
        return (
            <div>
                <p>You are on the Student Subject Edit Component</p>
                <p>Please populate fields to be updated</p>
                <form onSubmit={this.onSubmit}>

                    <div className="input-group my-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                        </div>

                        <input
                            type="text"
                            className="form-control  text-center"
                            name="subjectCode"
                            id="subjectCode"
                            placeholder="subject Code"
                            onChange={this.onChangeSubjectCode}
                        />
                    </div>

                    <button type="submit" className="btn btn-outline-success btn-block text-uppercase">
                        <i className="fas fa-sign-in-alt"></i> Login </button>
                </form>
            </div>
        )
    }

}


