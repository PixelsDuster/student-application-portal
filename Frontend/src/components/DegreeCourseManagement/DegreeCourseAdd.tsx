import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import { FaPlusCircle } from 'react-icons/fa'
import { useDispatch } from "react-redux"
import { useState } from "react"

import type { AppDispatch } from "../../redux/store"
import { fetchCourses, addCourse } from "../../redux/slices/courseSlice"

function DegreeCourseAdd() {
    const dispatch = useDispatch<AppDispatch>()
    const [show, setShow] = useState(false)

    const [editedCourseName, setEditedCourseName] = useState("")
    const [editedCourseShortName, setEditedCourseShortName] = useState("")
    const [editedUniversityName, setEditedUniversityName] = useState("")
    const [editedUniversityShortName, setEditedUniversityShortName] = useState("")
    const [editedDepartmentName, setEditedDepartmentName] = useState("")
    const [editedDepartmentShortName, setEditedDepartmentShortName] = useState("")

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSaving = async() => {
        if(!editedCourseName || !editedCourseShortName || !editedUniversityName || !editedUniversityShortName || !editedDepartmentName || !editedDepartmentShortName){
            alert("All fields are required !")
            return;
        }

        const newCourse: any = {
            name: editedCourseName,
            shortName: editedCourseShortName, 
            universityName: editedUniversityName, 
            universityShortName: editedUniversityShortName, 
            departmentName: editedDepartmentName, 
            departmentShortName: editedDepartmentShortName
        }
        try{
            await dispatch(addCourse(newCourse)).unwrap()
            await dispatch(fetchCourses()).unwrap()
            handleClose()
        }catch (error) {
            alert("Failed to add course")
        }
    }

    return (
        <>
            <div 
                id ="DegreeCourseManagementPageCreateDegreeCourseButton" 
                className="fs-3 text-dark" 
                role="button" 
                title="Add Course"
                onClick={handleShow}
            >
                <FaPlusCircle />
            </div>

            <Modal show={show} onHide={handleClose} id="DegreeCourseManagementPageCreateComponent">
                <Modal.Header>
                    <Modal.Title>Add Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>            
                        <Form.Group className="mb-3">
                            <Form.Label>DegreeCourse Name</Form.Label>
                            <Form.Control 
                                id="CreateDegreeCourseComponentEditName" 
                                type="text" 
                                placeholder="DegreeCourse Name required"
                                onChange={(e) => setEditedCourseName(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>DegreeCourse Short Name</Form.Label>
                            <Form.Control 
                                id="CreateDegreeCourseComponentEditShortName" 
                                type="text" 
                                placeholder="DegreeCourse Short Name required"
                                onChange={(e) => setEditedCourseShortName(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>University Name</Form.Label>
                            <Form.Control 
                                id="CreateDegreeCourseComponentEditUniversityName" 
                                type="text" 
                                placeholder="University Name required"
                                onChange={(e) => setEditedUniversityName(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>University Short Name</Form.Label>
                            <Form.Control 
                                id="CreateDegreeCourseComponentEditUniversityShortName" 
                                type="text" 
                                placeholder="University Short Name required"
                                onChange={(e) => setEditedUniversityShortName(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Department Name</Form.Label>
                            <Form.Control 
                                id="CreateDegreeCourseComponentEditDepartmentName" 
                                type="text" 
                                placeholder="Department Name required"
                                onChange={(e) => setEditedDepartmentName(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Department Short Name</Form.Label>
                            <Form.Control 
                                id="CreateDegreeCourseComponentEditDepartmentShortName" 
                                type="text" 
                                placeholder="Department Short Name required"
                                onChange={(e) => setEditedDepartmentShortName(e.target.value)} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button id="OpenDegreeCourseManagementPageListComponentButton" variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button id="CreateDegreeCourseComponentCreateDegreeCourseButton" variant="success" onClick={handleSaving}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DegreeCourseAdd