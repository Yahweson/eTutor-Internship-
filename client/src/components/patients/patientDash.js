import React, {Component} from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class PatientDash extends Component{
    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
      

        this.state = {
            firstName: "",
            symptoms:"",
            duration: 0,
            status: "",
            date: new Date(),
            patients: [] 
        }
    }

    conmponentDidMount(){

    }

    onSubmit(e){
        e.preventDefault();

        window.location = '/';
    }

    render(){
        return(
            <div>
                <p>You are on the Patient Dash Component</p>

                <section id = "main">
                    <div className="container">
                        <div className="row">
                            <div className=" col-md-3">
                                <div class="list-group">
                                    <a href="#" className="list-group-item active"><span className="fa fa-cog" aria-hidden="true"></span> Dashboard</a>
                                    <a href="#" className="list-group-item"><span className="fas fa-list-alt " aria-hidden="true"></span> Personal Info </a>
                                    <a href="#" className="list-group-item"><i className="fas fa-align-left"></i><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Appointment Status</a>
                                    <a href="#" className="list-group-item"><i className="fas fa-user " aria-hidden="true"></i> Appointments <span className="badge">74</span></a>
                                </div>
                                <br />
                                
                            </div>
                            
                            <div className="col-md-9">
                                
                                <div className="panel panel-default">
                                    <div className="panel-heading bg-primary"  >
                                        <h3 className="panel-title" >Business Overview </h3>
                                    </div>
                                    <div className="panel-body">  
                                        
                                        <div className="row">
                                                    <div className="col-md-3">
                                                        <div className="well dash-box">
                                                            <h2><span className="fa fa-list-alt" aria-hidden="true"></span> 24</h2>
                                                            <h4>Appointments</h4>
                                                        </div>
                                                    </div>
                                        
                                        </div>


                            
                                    </div>
                                </div>
                                
                                <div className="panel panel-default">
                                    <div className="panel-heading ">
                                        <h3 className="panel-title">Latest Users </h3>
                                    </div>
                                    <div className="panel-body">
                                        <table className="table table-hover table-striped">
                                            <tr>
                                                <td>Name</td>
                                                <td>Email</td>
                                                <td>Joined</td>
                                            </tr>
                                            <tr>
                                                <td>Jill Scott</td>
                                                <td>jilScott@gmail.com</td>
                                                <td>Dec 10, 2020</td>
                                            </tr>
                                            <tr>
                                                <td>Jill Scott</td>
                                                <td>jilScott@gmail.com</td>
                                                <td>Dec 10, 2020</td>
                                            </tr>
                                            <tr>
                                                <td>Jill Scott</td>
                                                <td>jilScott@gmail.com</td>
                                                <td>Dec 10, 2020</td>
                                            </tr>
                                        </table> 
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


