import { FaUserTie, FaUser } from "react-icons/fa"

import UserDelete from "./UserDelete"
import UserEdit from "./UserEdit"

export interface UserCardProps {
    userID: string
    firstName: string
    lastName: string
    isAdministrator: boolean
}

function UserCard({userID, firstName, lastName, isAdministrator}: UserCardProps) {
    const icon = isAdministrator? <FaUserTie size={24} className="text-secondary" /> : <FaUser size={24} className="text-secondary" />

    return (
        <div id={"UserItem" + userID} className="shadow-sm m-2 card" style={{ width: "100%", backgroundColor: "white", padding: "1rem", borderRadius: "8px" }}>
            <div className="card-header bg-white border-0 p-0 mb-2">
                <div className="d-flex align-items-center gap-2">
                    {icon}
                    <div>
                        <h5 className="card-title mb-0">{firstName} {lastName}</h5>
                        <h6 className="card-subtitle text-muted">{isAdministrator ? "Administrator" : "Standard User"}</h6>
                    </div>
                </div>
            </div>

            <div className="card-body p-0 mb-3">
                <p className="card-text" id="UserID"><strong>UserID:</strong> {userID}</p>
                <p className="card-text" id="FirstName"><strong>First Name:</strong> {firstName}</p>
                <p className="card-text" id="LastName"><strong>Last Name:</strong> {lastName}</p>
            </div>

            <div className="card-footer bg-white border-0 p-0 d-flex gap-2">
                <UserEdit 
                    userID={userID} 
                    firstName={firstName}
                    lastName={lastName}
                    isAdministrator={isAdministrator}
                />
                <UserDelete 
                    userID={userID} 
                    name={firstName + " " + lastName} 
                />
            </div>
        </div>
    )
}

export default UserCard;