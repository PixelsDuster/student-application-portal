import { FaBookOpen } from "react-icons/fa"
import { useSelector } from "react-redux"

import type { RootState } from "../../redux/store"
import DegreeCourseDelete from "./DegreeCourseDelete"
import DegreeCourseEdit from "./DegreeCourseEdit"
import ApplicationCreate from "../DegreeCourseApplicationManagement/ApplicationCreate"

export interface CourseCardProps {
    courseID: string,
    courseShortName: string,
    courseName: string,
    universityName: string,
    universityShortName: string,
    departmentName: string,
    departmentShortName: string
}

function DegreeCourseCard({ courseID, courseName, courseShortName, universityName, universityShortName, departmentName, departmentShortName }: CourseCardProps) {
    const isAdmin: boolean = useSelector((state: RootState) => state.user.isAdministrator)
    
    return (
        <div id={"DegreeCourseItem" + courseID} className="shadow-sm m-2 card" style={{ width: "100%", backgroundColor: "white", padding: "1rem", borderRadius: "8px" }}>
            <div className="card-header bg-white border-0 p-0 mb-2">
                <div className="d-flex align-items-center gap-2">
                    <FaBookOpen size={24} />
                    <div>
                        <h5 className="card-title mb-0">{courseShortName}: {courseName}</h5>
                        <h6 className="card-subtitle text-muted">{universityShortName}</h6>
                    </div>
                </div>
            </div>

            <div className="card-body p-0 mb-3">
                <p className="card-text" id="UniversityName"><strong>University:</strong> {universityName}</p>
                <p className="card-text" id="DepartmentName"><strong>Department:</strong> {departmentName}</p>
                <p className="card-text" id="Name"><strong>Course:</strong> {courseName}</p>
            </div>

            <div className="card-footer bg-white border-0 p-0 d-flex gap-2">
                {isAdmin && 
                    <>
                        <DegreeCourseEdit 
                            courseID={courseID} 
                            courseName={courseName} 
                            courseShortName={courseShortName} 
                            universityName={universityName} 
                            universityShortName={universityShortName}
                            departmentName={departmentName}
                            departmentShortName={departmentShortName}
                        />
                        <DegreeCourseDelete 
                            courseID={courseID} 
                            name={courseShortName + ": " + courseName} 
                        />
                    </>
                }
                <ApplicationCreate 
                    courseID={courseID}
                    courseName={courseShortName + ": " + courseName}
                />
            </div>
        </div>
    )
}

export default DegreeCourseCard