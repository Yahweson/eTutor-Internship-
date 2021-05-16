import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CourseViewer = props => (
    <tr>
        <td>{props.currentCourse.courseName}</td>
        <td>{props.currentCourse.courseCode}</td>
        <td>{props.currentCourse.courseYears}</td>

        <td>
            <Link to={"/CourseEdit/" + props.currentCourse._id}>edit</Link> | <a href="#" onClick={() => { props.deleteCourseInfo(props.currentCourse._id, props.currentCourse.courseCode) }}>delete</a>
        </td>
    </tr>
)

class CourseView extends Component {
    constructor(props) {
        super(props);

        this.deleteCourseInfo = this.deleteCourseInfo.bind(this);

        this.state = {
            courseInfo: [],
            courseSubjects: [],
        }
    }

    deleteCourseInfo(id, code) {
        axios.delete('/courseInfo/remove/' + id)
            .then( res => console.log(res.data));

        this.setState({
            courseInfo: this.state.courseInfo.filter(el => el._id !== id)
        });

        axios.delete('/courseSubjects/removing/' + code)
            .then(res => console.log(res.data));

        this.setState({
            courseSubjects: this.state.courseSubjects.filter(el => el._id !== id)
        });
    }

    componentDidMount() {
        axios.get('http://localhost:5000/courseInfo/')
            .then(response => {
                this.setState({ courseInfo: response.data });
                console.log(this.state.courseInfo);
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get('http://localhost:5000/courseSubjects/')
            .then(response => {
                this.setState({ courseSubjects: response.data });
                console.log(this.state.courseSubjects);
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
        return this.state.courseInfo.map(currentCourse => {
            return <CourseViewer currentCourse={currentCourse} deleteCourseInfo={this.deleteCourseInfo} key={currentCourse._id} />;
        })
    }

    render() {
        return (
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
        );
    }

}

export default CourseView;
