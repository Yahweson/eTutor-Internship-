import React, {Component} from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class ConfirmAppointment extends Component{
    constructor(props){
        super(props);

        
        this.onChangeAppointmentTime = this.onChangeAppointmentTime.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            patients: [],
            appointmentTime:"",
            status: "",
            date: new Date(),
            idNumber:0,
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/appointment/')
            .then(response => {
                this.setState({
                    
                    patients: response.data
                });
           })
           .catch((err) => {
               console.log(err);
             });      
     }

    onChangeStatus(e) {
        this.setState({
            status : e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date : date
        });
    }

    onChangeAppointmentTime(e) {
        this.setState({
            appointmentTime : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        this.state.patients.map(patient => {
            if(this.props.match.params.id === patient._id){
                
                const idNumber = patient.idNumber;
                const symptoms = patient.symptoms;
                const appointmentTime= this.state.appointmentTime;
                const status= this.state.status;
                const date = this.state.date;

                const patientApp = {
                    status,
                    idNumber,
                    symptoms,
                    appointmentTime, 
                    date,
                    
                }

                console.log({patientApp});

                axios.post('http://localhost:5000/appointment/update/' + this.props.match.params.id, patientApp)
                    .then(res => console.log(res.data))
                    .catch( (err) => {
                        console.log(err);
                    });
    
            }
        });


      //  console.log(this.state.patients);
      
        
    //    axios.post('http://localhost:5000/appointment/update/'+ this.props.match.params.id, patient)
    //        .then(res => console.log(res.data))
    //        .catch((err) => {
    //            console.log(err);
    //        });

    }

    render(){
        return(
            <div>
                <p>You are on the Confirm AppointMent Component</p>
                <form onSubmit = {this.onSubmit}> 
                    <div>
                        <DatePicker
                            selected = {this.state.date}
                            onChange ={this.onChangeDate}
                        />
                    </div>

                    <div>
                        <input
                            type = "text"
                            className ="form-control"
                            placeholder ="Confirm appointment status"
                            name ="status"
                            onChange = {this.onChangeStatus}
                        />
                    </div>

                    <div>
                        <input
                            type = "text"
                            className ="form-control"
                            placeholder ="Appointment time"
                            name ="time"
                            onChange = {this.onChangeAppointmentTime}
                        />
                    </div>

                    <button type="submit" className="btn btn-outline-success btn-block text-uppercase">
							<i className="fas fa-sign-in-alt"></i> Confirm </button>
                </form>

                <ul>
                    {this.state.patients.map(patient => 
                        <li key={patient._id}>{patient.idNumber}{patient.symptoms}</li>    
                    )}
                </ul>
            </div>
        )
    }

}