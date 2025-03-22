import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './Pages/Student/Home'
import CoursesList from './Pages/Student/CoursesList'
import CourseDetails from './Pages/Student/CourseDetails'
import MyEnrollments from './Pages/Student/MyEnrollments'
import Player from './Pages/Student/Player'
import Loading from './Components/Student/Loading'
import Instructor from './Pages/Instructor/Instructor'
import Dashboard from './Pages/Instructor/Dashboard'
import AddCourse from './Pages/Instructor/AddCourse'
import MyCourse from './Pages/Instructor/MyCourse'
import StudentsEnrolled from './Pages/Instructor/StudentsEnrolled'
import Navbar from './Components/Student/Navbar'
import "quill/dist/quill.snow.css";

const App = () => {
  const isInstructorRoute = useMatch('/instructor/*')
  return (
    <div className='text-default min-h-screen bg-white'>
      {!isInstructorRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-list/" element={<CoursesList />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />
        <Route path='/instructor' element={<Instructor />} >
          <Route path="/instructor" element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourse />} />
          <Route path="student-enrolled" element={<StudentsEnrolled />} />

        </Route>


      </Routes>
    </div>
  )
}

export default App