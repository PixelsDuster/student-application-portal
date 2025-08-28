import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

import type { AppDispatch } from "../../redux/store";
import type { RootState } from "../../redux/store"
import { deleteUser, fetchUsers, clearUserInfo } from "../../redux/slices/userSlice";
import { logout } from "../../redux/slices/authSlice";

function UserDelete({ userID, name }: { userID: string, name: string }) {
    const [show, setShow] = useState(false)
    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()
    const loggedInUser = useSelector((state: RootState) => state.user.userID)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleDeletion = async() => {
        await dispatch(deleteUser(userID))

        if(userID === loggedInUser){
            dispatch(logout())
            dispatch(clearUserInfo())
            navigate("/login")
        }else {
            await dispatch(fetchUsers())
        }

        handleClose()
    }

    return (
        <>
            <Button 
                id={"UserItemDeleteButton" + userID}
                variant="danger"
                onClick={handleShow}
            >
                Delete
            </Button>

            <Modal show={show} onHide={handleClose} id={"DeleteDialogUser" + userID}>
                <Modal.Header>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete User <strong>{name}</strong> ?
                </Modal.Body>
                <Modal.Footer>
                    <Button id="DeleteDialogCancelButton" variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button id="DeleteDialogConfirmButton" variant="danger" onClick={handleDeletion}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UserDelete;