import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import { useDispatch } from "react-redux"
import { useState } from "react"

import type { AppDispatch } from "../../redux/store"
import { fetchCourses, editCourse } from "../../redux/slices/courseSlice"
import type{ CourseCardProps } from "./DegreeCourseCard"

function DegreeCourseEdit({ courseID, courseName, courseShortName, universityName, universityShortName, departmentName, departmentShortName }: CourseCardProps) {
    const dispatch = useDispatch<AppDispatch>()
    const [show, setShow] = useState(false)
    
    const [editedCourseName, setEditedCourseName] = useState(courseName)
    const [editedCourseShortName, setEditedCourseShortName] = useState(courseShortName)
    const [editedUniversityName, setEditedUniversityName] = useState(universityName)
    const [editedUniversityShortName, setEditedUniversityShortName] = useState(universityShortName)
    const [editedDepartmentName, setEditedDepartmentName] = useState(departmentName)
    const [editedDepartmentShortName, setEditedDepartmentShortName] = useState(departmentShortName)

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleEditing = async() => {
        const updatedCourse: any = {
            courseID,
            name: editedCourseName,
            shortName: editedCourseShortName, 
            universityName: editedUniversityName, 
            universityShortName: editedUniversityShortName, 
            departmentName: editedDepartmentName, 
            departmentShortName: editedDepartmentShortName
        }
            
        try{
            await dispatch(editCourse(updatedCourse)).unwrap()
            await dispatch(fetchCourses()).unwrap()
            handleClose()
        }catch (error){
            alert("Failed to edit course")
        }
    }

    return (
        <>
            <Button
                id={"DegreeCourseItemEditButton"+courseID}
                variant="primary"
                onClick={handleShow}
            >
                Edit
            </Button>

            <Modal show={show} onHide={handleClose} id="DegreeCourseManagementPageEditComponent">
                <Modal.Header>
                    <Modal.Title>Modification: {courseShortName}: {courseName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>DegreeCourse Name</Form.Label>
                            <Form.Control 
                                id="EditDegreeCourseComponentEditName" 
                                type="text" 
                                value={editedCourseName} 
                                onChange={(e) => setEditedCourseName(e.target.value)} 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>DegreeCourse Short Name</Form.Label>
                            <Form.Control 
                                id="EditDegreeCourseComponentEditShortName" 
                                type="text" 
                                value={editedCourseShortName} 
                                onChange={(e) => setEditedCourseShortName(e.target.value)} 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>University Name</Form.Label>
                            <Form.Control 
                                id="EditDegreeCourseComponentEditUniversityName" 
                                type="text" 
                                value={editedUniversityName} 
                                onChange={(e) => setEditedUniversityName(e.target.value)} 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>University Short Name</Form.Label>
                            <Form.Control 
                                id="EditDegreeCourseComponentEditUniversityShortName" 
                                type="text" 
                                value={editedUniversityShortName} 
                                onChange={(e) => setEditedUniversityShortName(e.target.value)} 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Department Name</Form.Label>
                            <Form.Control 
                                id="EditDegreeCourseComponentEditDepartmentName" 
                                type="text" 
                                value={editedDepartmentName} 
                                onChange={(e) => setEditedDepartmentName(e.target.value)} 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Department Short Name</Form.Label>
                            <Form.Control 
                                id="EditDegreeCourseComponentEditDepartmentShortName" 
                                type="text" 
                                value={editedDepartmentShortName} 
                                onChange={(e) => setEditedDepartmentShortName(e.target.value)} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button id="OpenDegreeCourseManagementPageListComponentButton" variant="secondary" onClick={handleClose}>Back to List</Button>
                    <Button id="EditDegreeCourseComponentSaveDegreeCourseButton" variant="success" onClick={handleEditing}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DegreeCourseEdit