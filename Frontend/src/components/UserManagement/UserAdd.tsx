import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import { FaPlusCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

import type { AppDispatch, RootState } from "../../redux/store"
import { addUser, fetchUsers } from "../../redux/slices/userSlice"

function UserAdd() {
    const [show, setShow] = useState(false)
    const dispatch = useDispatch<AppDispatch>()

    const [editedUserID, setEditedUserID] = useState("")
    const [editedFirstName, setEditedFirstName] = useState("")
    const [editedLastName, setEditedLastName] = useState("")
    const [editedPassword, setEditedPassword] = useState("")
    const [editedAdmin, setEditedAdmin] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const users = useSelector((state: RootState) => state.user.users)
    const handleSaving = async() => {

        if(!editedUserID || !editedFirstName || !editedLastName || !editedPassword){
            alert("All fields are required !")
            return;
        }

        const userIDCheck = users.find(user => user.userID === editedUserID)
        if(userIDCheck){
            alert("userID must be unique !")
            return;
        }

        const newUser: any = {
            userID: editedUserID,
            firstName: editedFirstName,
            lastName: editedLastName,
            password: editedPassword,
            isAdministrator: editedAdmin
        }

        try{
            await dispatch(addUser(newUser)).unwrap()
            await dispatch(fetchUsers()).unwrap()
            handleClose()
        }catch (error){
            alert("Failed to add User")
        }
    }

    return (
        <>
            <div 
                id ="UserManagementPageCreateUserButton" 
                className="fs-3 text-dark" 
                role="button" 
                title="Add User"
                onClick={handleShow}
            >
                <FaPlusCircle />
            </div>

            <Modal show={show} onHide={handleClose} id="UserManagementPageCreateComponent">
                <Modal.Header>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control 
                                id="CreateUserComponentEditUserID" 
                                type="text" 
                                placeholder="UserID required" 
                                onChange={(e) => setEditedUserID(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                You can't edit userID after adding the user
                            </Form.Text>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                                id="CreateUserComponentEditFirstName" 
                                type="text" 
                                placeholder="First Name required"
                                onChange={(e) => setEditedFirstName(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                                id="CreateUserComponentEditLastName" 
                                type="text" 
                                placeholder="Last Name required" 
                                onChange={(e) => setEditedLastName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                id="CreateUserComponentEditPassword" 
                                type="password" 
                                placeholder="Password required" 
                                onChange={(e) => setEditedPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check 
                                id="CreateUserComponentEditIsAdministrator" 
                                type="checkbox" 
                                label="Administrator-Rights"
                                onChange={(e) => setEditedAdmin(e.target.checked)}
                            />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button id="OpenUserManagementPageListComponentButton" variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button id="CreateUserComponentCreateUserButton" variant="success" onClick={handleSaving}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default UserAdd;