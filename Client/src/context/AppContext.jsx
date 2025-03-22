import { createContext, use, useEffect } from "react";
import { dummyCourses } from "../assets/assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";


export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()
    const [allCourses, setAllCourses] = useState([])
    const [isInstructor, setIsInstructor] = useState(true)
    const [enrolledCourses, setEnrolledCourses] = useState([])

    // console.log(enrolledCourses)

    const fetchAllCourses =  () => {
        try {
            setAllCourses(dummyCourses)
        } catch (error) {
            console.error('Failed to fetch courses:', error)
        }
    }
    //to calculate rating 
    const calculateRating = (course) => {
        if (!course.courseRatings || course.courseRatings.length === 0) {
            return 0;
        }
        const totalRatings = course.courseRatings.length;
        const sumRatings = course.courseRatings.reduce((sum, rating) => {
            const validRating = typeof rating === 'number' && !isNaN(rating) ? rating : 0;
            return sum + validRating;
        }, 0);
        return totalRatings > 0 ? (sumRatings / totalRatings) : 0;
    }

    //course chapter time 
    const calculateChapterTime = (chapter) => {
        let time = 0
        chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration)
        return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})
    }

    //course duration
    const calculateCourseDuration = (course) => {
        let time = 0
        course.courseContent.map((chapter) => chapter.chapterContent.map(
            (lecture) => time += lecture.lectureDuration
        ))
        return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})
    }

    //no.of lectures
    const calculateNoOfLectures = (course) => {
        let totalLectures = 0
        course.courseContent.forEach(chapter => {
            if(Array.isArray(chapter.chapterContent)) {
                totalLectures += chapter.chapterContent.length
            }
        })
        return totalLectures;
    }

    //user Enrolled Courses
    const fetchUserEnrolledCourses = async ()=>{
        setEnrolledCourses(dummyCourses)
    }

    useEffect(() => {
        fetchAllCourses()
        fetchUserEnrolledCourses()
    }, []) 

    const value = {
        currency, allCourses, navigate, calculateRating, isInstructor, setIsInstructor, calculateChapterTime, calculateCourseDuration, calculateNoOfLectures, enrolledCourses, fetchUserEnrolledCourses
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
