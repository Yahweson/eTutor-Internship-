import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class LecturerSubjectAdd extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    constructor(props) {
        super(props);

        this.state = {

            subjectName: '',

        }
    }

    increaseSubj = e => {
        e.preventDefault();
        this.props.nextSubj();

    }

    decreaseSubj = e => {
        e.preventDefault();
        this.props.prevSubj();

    }

    render() {
        const { values, handleChange } = this.props;
        const { subjectNo } = values;

        var { subCount } = values;

        if (subjectNo != 0) {
            while (subCount < subjectNo) {

                return (
                    <div>
                        <div className="container">
                            <div className="row">
                                <div className="d-flex justify-content-center">
                                    <Link to="/AdminCourses/" className="btn btn-info text-uppercase">Back</Link>

                                </div>
                            </div>
                        </div>
                        <h4>Entry No {subCount}</h4>
                        <p>You are on the Admin Lecturer and subject Add Component {subCount}</p>
                        <form onSubmit={this.onSubmit}>

                            <label>Subject Code</label>
                            <div className="input-group my-3 text-center">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-lock"></i></span>
                                </div>

                                <input
                                    type="text"
                                    className="form-control text-center"
                                    name="subjectCode"
                                    id="subjectCode"
                                    placeholder="subjectCode"
                                    onChange={handleChange('subjectCode')}

                                />
                            </div>

                            <button type="submit" onClick={this.increaseSubj} className="btn btn-outline-success btn-block text-uppercase">
                                <i className="fas fa-sign-in-alt"></i> Next</button>

                            <button type="submit" onClick={this.decreaseSubj} className="btn btn-outline-warning btn-block text-uppercase">
                                <i className="fas fa-sign-in-alt"></i> Back</button>

                        </form>
                    </div>
                )

            }

            return (
                <div>
                    <h1>Continue to Lecturer Info</h1>
                    <button type="submit" onClick={this.continue} className="btn btn-outline-success btn-block text-uppercase">
                        <i className="fas fa-sign-in-alt"></i> Next</button>
                </div>
            )

        } 

    }

}
