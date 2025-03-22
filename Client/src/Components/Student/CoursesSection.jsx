import React, { use, useContext } from 'react'
import { Link } from 'react-router-dom'
import CourseCard from './CourseCard'
import { AppContext } from '../../context/AppContext'

const CoursesSection = () => {
  const allCourses = useContext(AppContext)
  const data=(allCourses.allCourses)
  return (
    <div className='py-16 md:px-40 px-8'>
      <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3'>We bring together the best courses from the best instructors to help you achieve your dreams</p>
      <div className='grid grid-cols-auto px-4 md:px-0 md:my-16 my-10 gap-4'>
        {data.length>0 ? data.slice(0, 5).map((course, index) => <CourseCard key={index} course={course}  />) : <p>Loading...</p>}  
      </div>
      <Link to={'/course-list'} onClick={() => scrollTo(0, 0)}
        className='text-gray-500 border border-gray-500/30 px-10 py-3 rounded'>View all Courses</Link>
    </div>
  )
}

export default CoursesSection