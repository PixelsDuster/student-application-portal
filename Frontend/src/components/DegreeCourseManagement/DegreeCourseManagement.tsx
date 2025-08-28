import { FaArrowsRotate } from 'react-icons/fa6'

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import type { RootState, AppDispatch } from "../../redux/store";
import { fetchCourses } from "../../redux/slices/courseSlice";

import DegreeCourseAdd from "./DegreeCourseAdd"
import DegreeCourseList from "./DegreeCourseList"

function DegreeCourseManagement() {
    const dispatch = useDispatch<AppDispatch>()
    const courseList = useSelector((state: RootState) => state.course.courses)
    const error = useSelector((state: RootState) => state.course.error)
    const isAdmin: boolean = useSelector((state: RootState) => state.user.isAdministrator)

    useEffect(() => {
        dispatch(fetchCourses())
    }, [dispatch])

    const handleRefresh = () => {
        dispatch(fetchCourses())
    }

    return (
        <div  id="DegreeCourseManagementPage" className='min-vh-100 w-100' style={{ background: 'linear-gradient(135deg, #e0f7e9, #c6f1d6)' }}>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1 className='mt-3'>DegreeCourse-Liste</h1>
                    <div className="d-flex gap-3">
                        {isAdmin &&
                            <DegreeCourseAdd />
                        }
                        <i className="fs-3 text-dark" role="button" title="Refresh" onClick={handleRefresh}><FaArrowsRotate /></i>
                    </div>
                </div>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <DegreeCourseList courseList={courseList} />
            </div>
        </div>
    )
}

export default DegreeCourseManagement