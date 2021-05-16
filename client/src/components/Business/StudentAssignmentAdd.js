import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class StudentAssignmentAdd extends Component {
    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onDescChange = this.onDescChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            imagesProfile: {

            },
            studentAssignmentFile: '',
            studentNo: 2154609,
            subjects: [],
            info:[],
            plush:[],
            selectedOption: "",

        }
    }
    onValueChange(e) {
        this.setState({
            selectedOption: e.target.value
        });
    }

    onChangeName = e => {
        this.setState({
            productName: e.target.value
        });
    }

    onDescChange = e => {
        this.setState({
            productDesc: e.target.value
        });
    }

    onPriceChange = e => {
        this.setState({
            productPrice: e.target.value
        });
    }

    onFileChange(e) {
        this.setState({ studentAssignmentFile: e.target.files[0] })
    }

    onSubmit(e) {
        e.preventDefault();

        const formData = new FormData();

        /*const assignmentInfo = {
            subjectCode : this.state.selectedOption,
            studentNo : this.state.studentNo
        }
        axios.post("http://localhost:5000/studentAssignments/add", assignmentInfo, {
        }).then(res => {
            console.log(res)
        });

        formData.append('studentAssignmentFile', this.state.studentAssignmentFile);

        console.log(this.state.studentAssignmentFile);
        axios.post("http://localhost:5000/studentAssignments/uploadAssignment", formData, {
        }).then(res => {
            console.log(res)
        });*/
       // window.location = '/';
       axios.get('http://localhost:5000/studentInfo/' + this.props.match.params.id )
            .then(response => {
                this.setState({ info: response.data });
                console.log("fetched");
                console.log(this.state.info);
                const {studentNo} = this.state.info;
                console.log(studentNo);

                const assignmentInfo = {
                    subjectCode : this.state.selectedOption,
                    studentNo : studentNo
                }
                axios.post("http://localhost:5000/studentAssignments/add", assignmentInfo, {
                }).then(res => {
                    console.log(res)
                });

                formData.append('studentAssignmentFile', this.state.studentAssignmentFile);

                console.log(this.state.studentAssignmentFile);
                axios.post("http://localhost:5000/studentAssignments/uploadAssignment", formData, {
                }).then(res => {
                    console.log(res)
                });
                  //  console.log(this.state.subjects);

            })
            .catch((err) => {
                console.log(err);
            });
    }


    componentDidMount() {

            axios.get('http://localhost:5000/studentInfo/' + this.props.match.params.id )
            .then(response => {
                this.setState({ info: response.data });
                console.log("fetched");
                console.log(this.state.info);
                const {studentNo} = this.state.info;
                console.log(studentNo);
                axios.get('http://localhost:5000/studentSubjects/byStudent/' + studentNo)
                    .then(response => {
                        this.setState({
                            subjects: response.data
                        });
                    }) .catch((err) => {
                        console.log(err);
                    });
                    console.log(this.state.subjects);

            })
            .catch((err) => {
                console.log(err);
            });

            
           /* console.log(this.state.studentNo);
            const filtered = this.state.subjects.filter((item) =>{
                return item.student == studentNo
            });*/
            //console.log(studentNo);
            console.log(this.state.info);
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
                                        {this.state.subjects.map( juice =>
                                        <div  className="radio">
                                            <label key ={juice._id}>
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



                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}


