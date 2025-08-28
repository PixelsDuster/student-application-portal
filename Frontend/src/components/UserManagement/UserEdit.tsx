import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import { useDispatch } from "react-redux"
import { useState } from "react";

import type { AppDispatch } from "../../redux/store";
import { editUser, fetchUsers } from "../../redux/slices/userSlice";
import type { UserCardProps } from "./UserCard"

function UserEdit({userID, firstName, lastName, isAdministrator}: UserCardProps) {
    
    const [show, setShow] = useState(false)
    const dispatch = useDispatch<AppDispatch>()

    const [editedFirstName, setEditedFirstName] = useState(firstName)
    const [editedLastName, setEditedLastName] = useState(lastName)
    const [editedPassword, setEditedPassword] = useState("")
    const [editedAdmin, setEditedAdmin] = useState(isAdministrator)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleEditing = async() => {
        const updatedUser: any = {
            userID,
            firstName: editedFirstName,
            lastName: editedLastName,
            isAdministrator: editedAdmin
        }

        if(editedPassword.trim() !== ""){
            updatedUser.password = editedPassword
        }
        
        try{
            await dispatch(editUser(updatedUser)).unwrap()
            await dispatch(fetchUsers()).unwrap()
            handleClose()
        }catch (error){
            alert("Failed to Edit User")
        }
    }

    return (
        <>
            <Button 
                id={"UserItemEditButton" + userID} 
                variant="primary"
                onClick={handleShow}
            >
                Edit
            </Button>

            <Modal show={show} onHide={handleClose} id="UserManagementPageEditComponent">
                <Modal.Header>
                    <Modal.Title>Modify: {firstName} {lastName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control 
                                id="EditUserComponentEditUserID" 
                                type="text" 
                                value={userID} 
                                disabled 
                            />
                            <Form.Text className="text-muted">
                                You can't edit userID
                            </Form.Text>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                                id="EditUserComponentEditFirstName" 
                                type="text" 
                                value={editedFirstName} 
                                onChange={(e) => setEditedFirstName(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                                id="EditUserComponentEditLastName" 
                                type="text" 
                                value={editedLastName} 
                                onChange={(e) => setEditedLastName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                id="EditUserComponentEditPassword" 
                                type="password" 
                                placeholder="Password" 
                                onChange={(e) => setEditedPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check 
                                id="EditUserComponentEditIsAdministrator" 
                                type="checkbox" 
                                label="Administrator-Rights"
                                checked={editedAdmin}
                                onChange={(e) => setEditedAdmin(e.target.checked)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button id="OpenUserManagementPageListComponentButton" variant="secondary" onClick={handleClose}>Back to List</Button>
                    <Button id="EditUserComponentSaveUserButton" variant="success" onClick={handleEditing}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UserEdit;