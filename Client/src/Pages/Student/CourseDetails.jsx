import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../Components/Student/Loading'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import Footer from '../../Components/Student/Footer'
import YouTube from 'react-youtube'


const CourseDetails = () => {

  const { id } = useParams()
  const [courseData, setCourseData] = useState(null)
  const { allCourses, calculateRating, calculateNoOfLectures, calculateCourseDuration, calculateChapterTime} = useContext(AppContext)
  const fetchCourseData = async () => {
    const findCourse = allCourses.find(course => course._id === id)
    if (findCourse) {
      setCourseData(findCourse)
    } else {
      console.error('Course not found')
    }
  }
  useEffect(() => {
    fetchCourseData()
  }, [])
  return courseData ? (
    <>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>
        <div className='absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70'></div>

        {/* left */}
        <div className='max-w-xl z-10 text-gray-500'>
          <h1 className='md:text-course-details-heading-large text-course-details-heading-small font-semibold text-gray-800'>{courseData.courseTitle}</h1>
          <p className='pt-4 md:text-base text-sm'
            dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}></p>
        </div>

        {/* reviews & Ratings */}
        <div className='flex items-center space-x-2'>
          <p>{calculateRating(courseData)}</p>
          <div className='flex'>
            {[...Array(5)].map((_, i) => (<img key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt=""
              className='w-3.5 h-3.5' />)
            )}
          </div>
          <p className='text-blue-600'>({courseData.courseRatings.length} {courseData.courseRatings.length >0 ? 'ratings' : 'rating'})</p>

          <p>{courseData.enrolledStudents.length}{courseData.enrolledStudents.length > 1 ? 'students' : 'student'}</p>
        </div>
        <p className='text-sm'>Course by <span className='text-blue-600 underline'>BeDev</span></p>
        <div className='pt-8 text-gray-800'>
          <h2 className='text-xl font-semibold'>Course Structure</h2>
          <div className='pt-5'>
            {
              courseData.courseContent.map((chapter, index) => (
                <div key={index} >
                  <div>
                    <div>
                      <img src={assets.down_arrow_icon} alt="" />
                      <p>{chapter.chapterTitle}</p>
                    </div>
                    <p>{chapter.chapterContent.length} lecture -{calculateChapterTime}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        {/* right */}
        <div></div>

      </div>
      <Footer />
    </>
  ) : <Loading />
}

export default CourseDetails