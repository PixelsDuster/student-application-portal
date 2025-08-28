import { useDispatch } from "react-redux"
import { useEffect } from "react"

import type { AppDispatch } from "../../redux/store"
import { fetchCourses } from "../../redux/slices/courseSlice"
import ApplicationCard from "./ApplicationCard"

interface Props {
    applicationList: any[]
}

function ApplicationList({ applicationList }: Props) {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchCourses())
    }, [dispatch])
    
    return (
        <div className="row" id="DegreeCourseApplicationManagementPageListComponent">
            {applicationList.map((application) => (
                <div key={application.id} className="col-md-4 d-flex">
                    <ApplicationCard
                        applicationID={application.id}
                        applicantUserID={application.applicantUserID}
                        degreeCourseID={application.degreeCourseID}
                        targetPeriodYear={application.targetPeriodYear}
                        targetPeriodShortName={application.targetPeriodShortName}
                    />
                </div>
            ))}
        </div>
    )
}

export default ApplicationList