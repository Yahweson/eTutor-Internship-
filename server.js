const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();


app.get('/api/patients', (req,res) => {
    const patients = [
        {id: 1, firstName: "John ", lastName:"Doe"},
        {id: 2, firstName: "Karen ", lastName:"Mentjies"},
        {id: 3, firstName: "Carle ", lastName:"Jansen"}        
    ];

    res.json(patients);
});

const port = 5000;

app.use(cors());
app.use(express.json());

const mongoURI = 'mongodb://localhost:27017/eTutor';

mongoose.connect(mongoURI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then( () => console.log("MongoDB connected"))
    .catch( err => console.log(err));

const patientRouter = require('./client/src/routes/patients');
const appointmentRouter = require('./client/src/routes/appointment');
const personalInfoRouter = require('./client/src/routes/personalInfo');



app.use('/patients/', patientRouter);
app.use('/patientInfo/', personalInfoRouter);
app.use('/appointment/', appointmentRouter);
//Used to require admin route
const adminRouter = require('./client/src/routes/adminRoute');

// Used to require routes
const studentAssignmentRouter = require('./client/src/routes/studentAssignmentRoute');
const studentInfoRouter = require('./client/src/routes/studentInfoRoute');
const studentSubjectRouter = require('./client/src/routes/studentSubjectRoute');

const lecturerVideoRouter = require('./client/src/routes/lecturerVideoRoute');
const lecturerAssignmentRouter = require('./client/src/routes/lectureAssignmentRoute');
const lecturerSubjectRouter = require('./client/src/routes/lecturerSubjectRoute');
const lecturerInfoRouter = require('./client/src/routes/lecturerInfoRoute');

const courseSubjectRouter = require('./client/src/routes/courseSubjectRoute');
const courseInfoRouter = require('./client/src/routes/CourseInfoRoute');

//Used to Enter values into the Database
app.use('/adminInfo/', adminRouter);

app.use('/lecturerVideos/',lecturerVideoRouter);
app.use('/lecturerAssignments/',lecturerAssignmentRouter);
app.use('/lecturerSubjects/',lecturerSubjectRouter);
app.use('/lecturerInfo/',lecturerInfoRouter);

app.use('/studentAssignments/',studentAssignmentRouter);
app.use('/studentInfo/',studentInfoRouter);
app.use('/studentSubjects/',studentSubjectRouter);

app.use('/courseSubjects/',courseSubjectRouter);
app.use('/courseInfo/',courseInfoRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});