import { FaTableList } from "react-icons/fa6";
import Button from "react-bootstrap/Button"
import { useSelector } from "react-redux"

import ApplicationDelete from "./ApplicationDelete"
import type { RootState } from "../../redux/store"

interface ApplicationCardProps {
    applicationID: string,
    applicantUserID: string,
    degreeCourseID: string,
    targetPeriodYear: number,
    targetPeriodShortName: string
}

function ApplicationCard({ applicationID, applicantUserID, degreeCourseID, targetPeriodYear, targetPeriodShortName }: ApplicationCardProps) {
    const courseList = useSelector((state: RootState) => state.course.courses)
    const course = courseList.find(course => course.id === degreeCourseID)

    if (!course) {
        return (
            <div className="alert alert-danger">
                Could not find course with ID: <strong>{degreeCourseID}</strong>
            </div>
        )
    }
    
    return (
        <div id={"DegreeCourseApplicationItem" + applicationID} className="shadow-sm m-2 card" style={{ width: "100%", backgroundColor: "white", padding: "1rem", borderRadius: "8px" }}>
            <div className="card-header bg-white border-0 p-0 mb-2">
                <div className="d-flex align-items-center gap-2">
                    <FaTableList size={24} />
                    <div>
                        <h5 className="card-title mb-0">{applicantUserID}: {course.shortName} {targetPeriodShortName} {targetPeriodYear}</h5>
                        <h6 className="card-subtitle text-muted">{course.universityShortName}</h6>
                    </div>
                </div>
            </div>

            <div className="card-body p-0 mb-3">
                <p className="card-text" id="ApplicantUserID"><strong>User:</strong> {applicantUserID}</p>
                <p className="card-text" id="DegreeCourseName"><strong>Course:</strong> {course.name}</p>
                <p className="card-text" id="TargetPeriodYear"><strong>Year:</strong> {targetPeriodYear}</p>
                <p className="card-text" id="TargetPeriodShortName"><strong>Semester:</strong> {targetPeriodShortName}</p>
                <p className="card-text" id="UniversityShortName"><strong>University:</strong> {course.universityShortName}</p>
                <p className="card-text" id="DepartmentShortName"><strong>Department:</strong> {course.departmentShortName}</p>
            </div>

            <div className="card-footer bg-white border-0 p-0 d-flex gap-2">
                <>
                    <Button
                        id={"DegreeCourseApplicationItemEditButton"+applicationID}
                        variant="primary"
                    >
                        Edit
                    </Button>
                    <ApplicationDelete 
                        applicationID={applicationID}
                    />
                </>
            </div>
        </div>
    )
}

export default ApplicationCard