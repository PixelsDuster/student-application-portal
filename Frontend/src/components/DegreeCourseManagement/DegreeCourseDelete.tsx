import { useDispatch } from "react-redux"
import { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

import type { AppDispatch } from "../../redux/store"
import { fetchCourses, deleteCourse } from "../../redux/slices/courseSlice"

function DegreeCourseDelete({ courseID, name }: { courseID: string, name: string }) {
    const [show, setShow] = useState(false)
    const dispatch = useDispatch<AppDispatch>()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)    

    const handleDeletion = async() => {
        try{
            await dispatch(deleteCourse(courseID)).unwrap()
            await dispatch(fetchCourses()).unwrap()
            handleClose()
        }catch (error){
            alert("Failed to delete course")
        }
    }

    return (
        <>
            <Button 
                id={"DegreeCourseItemDeleteButton"+courseID}
                variant="danger"
                onClick={handleShow}
            >
                Delete
            </Button>

            <Modal show={show} onHide={handleClose} id={"DeleteDialogDegreeCourse" + courseID}>
                <Modal.Header>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete Course <strong>{name}</strong> ?
                </Modal.Body>
                <Modal.Footer>
                    <Button id="DeleteDialogCancelButton" variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button id="DeleteDialogConfirmButton" variant="danger" onClick={handleDeletion}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DegreeCourseDelete