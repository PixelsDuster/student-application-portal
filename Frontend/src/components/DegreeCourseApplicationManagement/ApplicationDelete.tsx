import { useDispatch } from "react-redux"
import { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

import type { AppDispatch } from "../../redux/store"
import { fetchApplications, deleteApplication } from "../../redux/slices/applicationSlice"


function ApplicationDelete({ applicationID }: { applicationID: string }) {
    const [show, setShow] = useState(false)
    const dispatch = useDispatch<AppDispatch>()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)    

    const handleDeletion = async() => {
        await dispatch(deleteApplication(applicationID))
        await dispatch(fetchApplications())
        handleClose()
    }    

    return (
        <>
            <Button 
                id={"DegreeCourseApplicationDeleteButton"+applicationID}
                variant="danger"
                onClick={handleShow}
            >
                Delete
            </Button>

            <Modal show={show} onHide={handleClose} id={"DeleteDialogDegreeCourseApplication" + applicationID}>
                <Modal.Header>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete The Application ?
                </Modal.Body>
                <Modal.Footer>
                    <Button id="DeleteDialogCancelButton" variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button id="DeleteDialogConfirmButton" variant="danger" onClick={handleDeletion}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ApplicationDelete