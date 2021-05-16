import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CourseViewer = props => (
    <tr>
        <td>{props.currentCourse.name}</td>
        <td>{props.currentCourse.subjectCode}</td>
        <td>{props.currentCourse.courseYears}</td>

        <td>
            <Link to={"/CourseEdit/" + props.currentCourse._id}>edit</Link> | <a href="#" onClick={() => { props.deleteCourseInfo(props.currentCourse._id, props.currentCourse.courseCode) }}>delete</a>
        </td>
    </tr>
)

class StudentAssignmentView extends Component {
    constructor(props) {
        super(props);

        this.deleteCourseInfo = this.deleteCourseInfo.bind(this);
        this.onValueChange = this.onValueChange.bind(this);

        this.state = {
            info: [],
            subjects: [],
            infoce: [],
            selectedOption: "",
        }
    }
    onValueChange(e) {
        this.setState({
            selectedOption: e.target.value
        });
    }
    deleteCourseInfo(id, code) {
        axios.delete('/courseInfo/remove/' + id)
            .then(res => console.log(res.data));

        this.setState({
            courseInfo: this.state.courseInfo.filter(el => el._id !== id)
        });

        axios.delete('/courseSubjects/removing/' + code)
            .then(res => console.log(res.data));

        this.setState({
            courseSubjects: this.state.courseSubjects.filter(el => el._id !== id)
        });
    }

    componentDidUpdate() {
        axios.get('http://localhost:5000/lecturerAssignments/' + this.state.selectedOption)
            .then(response => {
                this.setState({
                    infoce: response.data
                });
                console.log(this.state.infoce)
            }).catch((err) => {
                console.log(err);
            });
    }
    componentDidMount() {
        axios.get('http://localhost:5000/studentInfo/' + this.props.match.params.id)
            .then(response => {
                this.setState({ info: response.data });
                console.log("fetched");
                console.log(this.state.info);
                const { studentNo } = this.state.info;
                console.log(studentNo);
                axios.get('http://localhost:5000/studentSubjects/byStudent/' + studentNo)
                    .then(response => {
                        this.setState({
                            subjects: response.data
                        });
                        //  const { subjectCode } = this.state.subjects;
                        console.log(this.state.subjects);
                        axios.get('http://localhost:5000/lecturerAssignments/byStudent/' + this.state.selectedOption)
                            .then(res => {
                                this.setState({
                                    infoce: response.data
                                });
                                console.log(this.state.infoce)
                            }).catch((err) => {
                                console.log(err);
                            });

                    }).catch((err) => {
                        console.log(err);
                    });
                console.log(this.state.subjects);

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

    courseInfoList() {
        return this.state.infoce.map(currentCourse => {
            return <CourseViewer currentCourse={currentCourse} deleteCourseInfo={this.deleteCourseInfo} key={currentCourse._id} />;
        })
    }

    render() {
        return (


            <div>
                <div className="container">
                    <div className="row">
                        <div className="d-flex justify-content-center">
                            <Link to={"/StudentDash/" + this.props.match.params.id} className="btn btn-info text-uppercase">Back</Link>

                        </div>
                    </div>
                </div>
                <p>You are in the Student Assignment Add  Component</p>
                <p>Please select a course to upload to</p>
                <p>selected Course</p>
                {this.state.selectedOption}
                <section id="main">
                    <div className="container">
                        <div className="row">
                            <div className=" col-md-3">
                                <div class="list-group">
                                    <Link to="#" className="list-group-item active"><span className="fa fa-cog" aria-hidden="true"></span> Dashboard</Link>
                                    <Link to="#" className="list-group-item"><span className="fas fa-list-alt " aria-hidden="true"></span>View Student Assignment</Link>
                                    <Link to="#" className="list-group-item"><i className="fas fa-align-left"></i><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>Edit Student Assignment</Link>

                                </div>
                                <br />


                                <div class="list-group">
                                    <Link to="#" className="list-group-item active"><span className="fa fa-cog" aria-hidden="true"></span> SubjectCode</Link>

                                    <Link to="#" className="  list-group-item" >
                                        {this.state.subjects.map(juice =>
                                            <div className="radio">
                                                <label key={juice._id}>
                                                    <input
                                                        type="radio"
                                                        value={juice.subjectCode}
                                                        checked={this.state.selectedOption === juice.subjectCode}
                                                        onChange={this.onValueChange}
                                                    />
                                                    {juice.subjectCode}
                                                </label>
                                            </div>
                                        )}

                                    </Link>


                                </div>
                            </div>

                            <div className="col-md-9">
                                <div className="panel panel-default">
                                    <div className="panel-heading bg-primary"  >
                                        <h3 className="panel-title" >Add Assignment word or pdf </h3>
                                    </div>

                                    <div className="panel-body">

                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <form onSubmit={this.onSubmit}>
                                                    <h2>Enter Assignment</h2>


                                                    <input type="file" onChange={this.onFileChange} className="process_upload-btn" />
                                                    <button type="submit" role="button" className="w-2 p-3 btn btn-success pull-right">upload</button>

                                                </form>


                                            </div>

                                        </div>

                                        <div>
                                            <h2>Course Info</h2>

                                            <table className="table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>CourseName</th>
                                                        <th>CourseCode</th>
                                                        <th>courseYears</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {this.courseInfoList()}
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>

            //
        );
    }

}

export default StudentAssignmentView;
