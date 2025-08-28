import { FaArrowsRotate } from 'react-icons/fa6'

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import type { RootState, AppDispatch } from "../../redux/store";
import { fetchApplications } from "../../redux/slices/applicationSlice";

import ApplicationList from "./ApplicationList"

function DegreeCourseApplicationManagement() {
    const dispatch = useDispatch<AppDispatch>()
    const applicationList = useSelector((state: RootState) => state.application.applications)
    const error = useSelector((state: RootState) => state.application.error)

    useEffect(() => {
        dispatch(fetchApplications())
    }, [dispatch])

    const handleRefresh = () => {
        dispatch(fetchApplications())
    }

    return (
        <div id="DegreeCourseApplicationManagementPage" className='min-vh-100 w-100' style={{ background: 'linear-gradient(135deg, #e0f7e9, #c6f1d6)' }}>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1 className='mt-3'>DegreeCourseApplication-Liste</h1>
                    <div className="d-flex gap-3">
                        <i className="fs-3 text-dark" role="button" title="Refresh" onClick={handleRefresh}><FaArrowsRotate /></i>
                    </div>
                </div>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <ApplicationList applicationList={applicationList} />
            </div>
        </div>
    )
}

export default DegreeCourseApplicationManagement