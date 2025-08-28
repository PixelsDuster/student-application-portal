import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"

import type { RootState, AppDispatch } from "../../redux/store"
import { fetchCourses } from "../../redux/slices/courseSlice"
import { fetchUsers } from "../../redux/slices/userSlice";
import { createApplication } from "../../redux/slices/applicationSlice"

function ApplicationCreate({ courseID, courseName }: { courseID: string, courseName: string }) {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    const isAdmin: boolean = useSelector((state: RootState) => state.user.isAdministrator)
    const userID: string = useSelector((state: RootState) => state.user.userID)
    const users = useSelector((state: RootState) => state.user.users)

    const [show, setShow] = useState(false)
    const [editedUserID, setEditedUserID] = useState(userID)
    const [editedYear, setEditedYear] = useState("")
    const [editedSemester, setEditedSemester] = useState("")

    const resetForm = () => {
        setEditedUserID(userID);
        setEditedYear("");
        setEditedSemester("");
    };
    const handleClose = () => {
        resetForm()
        setShow(false)   
    }
    const handleShow = () => setShow(true)
    
    const handleApplication = async() => {
        //Check if all fields are filled
        if(!editedUserID || !editedYear || editedSemester === ""){
            alert("All fields are required !")
            return;
        }

        // check the validity of the year
        const year: number = Number(editedYear)
        if(isNaN(year) || year < 2025){
            alert("Input a year starting from 2025")
            return;
        }

        //check the validity of the userID
        if(isAdmin){
            const userIDCheck = users.some(user => user.userID === editedUserID)
            if(!userIDCheck){
                alert("userID does not exist !")
                return;
            }
        }

        //creating the new Application
        const newApplication = {
            applicantUserID: editedUserID,
            degreeCourseID: courseID,
            targetPeriodYear: year,
            targetPeriodShortName: editedSemester
        }

        //dispatch the new application
        try{
            await dispatch(createApplication(newApplication)).unwrap()
            await dispatch(fetchCourses()).unwrap()
            resetForm()
            handleClose()
        }catch{
            alert("Failed to create application")
        }
    }

    return(
        <>
            <Button
                id={"CreateDegreeCourseApplicationForDegreeCourse" + courseID}
                variant="success"
                onClick={handleShow}
            >
                Apply
            </Button>

            <Modal show={show} onHide={handleClose} id="CreateDegreeCourseApplicationComponent">
                <Modal.Header>
                    <Modal.Title>DegreeCourse Application: {courseName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>DegreeCourse Name</Form.Label>
                            <Form.Control 
                                id="CreateDegreeCourseApplicationEditDegreeCourseName" 
                                type="text" 
                                value={courseName}
                                disabled
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control 
                                id="CreateDegreeCourseApplicationEditUserID" 
                                type="text" 
                                value={editedUserID} 
                                onChange={(e) => setEditedUserID(e.target.value)} 
                                disabled={!isAdmin}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Year</Form.Label>
                            <Form.Control 
                                id="CreateDegreeCourseApplicationEditTargetPeriodYear" 
                                type="text" 
                                placeholder={"Enter Year"}
                                onChange={(e) => setEditedYear(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formTargetPeriodShortName">
                            <Form.Label>Semester</Form.Label>
                            <Form.Control 
                                id="CreateDegreeCourseApplicationEditTargetPeriodName" 
                                as="select"
                                name="targetPeriodShortName"                
                                onChange={(e) => setEditedSemester(e.target.value)} 
                            >
                                <option value="">Please select a Semester</option>
                                <option value="WiSe">Winter Semester</option>
                                <option value="SoSe">Summer Semester</option>
                            </Form.Control>
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button id="OpenDegreeCourseManagementPageListComponentButton" variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button id="CreateDegreeCourseApplicationCreateButton" variant="success" onClick={handleApplication}>Apply</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ApplicationCreate