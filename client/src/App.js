import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.js';

import Patients from './components/patients/patients';
import ConfirmAppointment from './components/patients/confirmApp';



import PatientLogin from './components/patients/patientLogin';
import PatientRegister from './components/patients/patientRegister';
import PatientDash from './components/patients/patientDash';

import EditAppointment from './components/Business/EditAppointment';
import ViewAppointments from './components/patients/viewAppointments';





import Login from './components/Business/Login';
//Admin View and edit
import AdminView from './components/Business/adminView';
import AdminEdit from './components/Business/AdminEdit';
// Course view and edit
import CourseView from './components/Business/courseView';
import CourseEdit from './components/Business/CourseInfoEdit';
//Subject view and edit
import SubjectView from './components/Business/subjectView';
import SubjectEdit from './components/Business/SubjectEdit';
//Lecturer view and edit
import LecturerView from './components/Business/lecturerView';
import LecturerEdit from './components/Business/LecturerInfoEdit';
//student view and edit
import StudentView from './components/Business/studentView';
import StudentEdit from './components/Business/StudentInfoEdit';

import StudentSubjectEdit from './components/Business/StudentSubjectEdit';
//view and edit student subjects
import StudentSubjctView from './components/Business/StudentSubjectView';
import SubjectViewStudent from './components/Business/SubjectViewStudent';
// Used by Admin To Manipulate Lecturer,Student and Cousrses Info
import Dash from './components/Business/Dash';

import DashAdmin from './components/Business/DashAdmin';
import DashCourses from './components/Business/DashCourses';
import DashLecturer from './components/Business/DashLecturer';
import DashStudent from './components/Business/DashStudent';


// Used by Admin to Add Lecturer,Student and Cousrses Info
import AdminStudentAdd from './components/patients/studentAdd';
import AdminAdd from './components/Business/AdminAdd';
import AdminCoursesAdd from './components/Business/CourseAdd';
import AdminLecturerAdd from './components/Business/LecturerAdd';

//Used by admin to enter subjects into Courses
import AdminUser from './components/Business/AdminUser';




//Used by to add subjects
import AddSubject from './components/Business/AddSubject';

// Used by Lectures to manipulate Video, files and assignments
import LecturerDash from './components/Business/LecturerDash';


import LecturerVideoDash from './components/Business/LecturerVideo';
import LecturerAssignmentDash from './components/Business/LecturerAssignments';
import LecturerCourseInfoDash from './components/Business/LecturerCourseInfo';

//used by Lecturers to Video, Assignment and files
import LectureVideoAdd from './components/Business/LecturerVideoAdd';
import LectureAssignmentAdd from './components/Business/LecturerAssignmentAdd';

//Used by Stdents to View Videos and Send Assignments
import StudentDash from './components/Business/StudentDash';
import StudentAssignmentAdd from './components/Business/StudentAssignmentAdd';

import Home from './components/home';
import NavBar from './components/NavBar';
//
import ChangeDefaultPasswordStudent from './components/Business/ChangeDefaultPasswordStudent';
import ChangeDefaultPasswordLecturer from './components/Business/ChangeDefaultPasswordLecturer';
import ChangeDefaultPasswordAdmin from './components/Business/ChangeDefaultPasswordAdmin';
//
import studentAssignmentView from './components/Business/StudentAssignmentView';
import studentVideoView from './components/Business/StudentVideoView';
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <br/>
        <Route  path='/' exact component={Home}/>
        <Route path='/patients' exact component={Patients}/>

        <Route path='/AdminView/' exact component={AdminView}/>
        <Route path='/AdminEdit/:id' exact component={AdminEdit}/>

        <Route path='/CourseView/' exact component={CourseView}/>
        <Route path='/CourseEdit/:id' exact component={CourseEdit}/>

        <Route path='/SubjectView/' exact component={SubjectView}/>
        <Route path='/SubjectEdit/:id' exact component={SubjectEdit}/>

        <Route path='/LecturerView/' exact component={LecturerView}/>
        <Route path='/LecturerEdit/:id' exact component={LecturerEdit}/>

        <Route path='/StudentView/' exact component={StudentView}/>
        <Route path='/StudentEdit/:id' exact component={StudentEdit}/>
        

        <Route path='/StudentSubjectEdit/:id' exact component={StudentSubjectEdit}/>
        <Route path='/StudentSubjctView/:id' exact component={StudentSubjctView}/>
        <Route path='/Kakarot/' exact component={SubjectViewStudent}/>
        

        <Route path='/AdminAdd/:id' exact component={AdminAdd}/>
        <Route path='/StudentAdd:id/' exact component={AdminStudentAdd}/>
        <Route path='/CourseAdd/:id' exact component={AdminCoursesAdd}/>
        <Route path='/LecturerAdd/:id' exact component={AdminLecturerAdd}/>

        <Route path='/AdminDash/:id' exact component={DashAdmin}/>
        <Route path='/AdminCourses/:id' exact component={DashCourses}/>
        <Route path='/AdminLecturer/:id' exact component={DashLecturer}/>
        <Route path='/AdminStudent/:id' exact component={DashStudent}/>

        <Route path='/LecturerDash/:id' exact component={LecturerDash} />
        
        <Route path='/LecturerVideoDash/:id' exact component={LecturerVideoDash} />
        <Route path='/LecturerAssignmentDash/:id' exact component={LecturerAssignmentDash} />
        <Route path='/LecturerCourseInfoDash/:id' exact component={LecturerCourseInfoDash} />
        
        <Route path='/LecturerVideoAdd/:id' exact component={LectureVideoAdd}/>
        <Route path='/LectureAssignmentAdd/:id' exact component={LectureAssignmentAdd}/>
        

        <Route path="/StudentDash/:id" exact component={StudentDash} />
        <Route path="/StudentAssignmentAdd/:id" exact component={StudentAssignmentAdd} />
        
        <Route path="/AddSubject/" exact component={AddSubject} />

        <Route path='/appointment/view' exact component={ViewAppointments} />
        <Route path='/appointment/confirm/:id' exact component={ConfirmAppointment}/>
        <Route path='/patient/add' exact component={PatientRegister}/>
        <Route path='/patient/login' exact component={PatientLogin}/>
        <Route path='/patient/patientDash' exact component={PatientDash}/>     

        <Route path='/admin/dash/:id' exact component={Dash}  />

        <Route path ='/login/' exact component={Login} />
        <Route path ='/ChangeDefaultPasswordStudent/:id' exact component={ChangeDefaultPasswordStudent} />
        <Route path ='/ChangeDefaultPasswordLecturer/:id' exact component={ChangeDefaultPasswordLecturer} />
        <Route path ='/ChangeDefaultPasswordAdmin/:id' exact component={ChangeDefaultPasswordAdmin} />
        
        <Route path ='/studentVideoView/:id' exact component={studentVideoView} />
        <Route path ='/studentAssignmentView/:id' exact component={studentAssignmentView} />


        

      </Router>
    
    </div>
  );
}

export default App;
