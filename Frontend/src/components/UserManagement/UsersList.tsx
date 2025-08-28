import UserCard from "./UserCard"

interface Props {
    userList: any[]
}

function UserList({ userList }: Props) {
    return (
        <div className="row" id="UserManagementPageListComponent">
            {userList.map((user) => (
                <div key={user.userID} className="col-md-4 d-flex">
                    <UserCard 
                        userID={user.userID} 
                        firstName={user.firstName} 
                        lastName={user.lastName} 
                        isAdministrator={user.isAdministrator}
                    />
                </div>
            ))}
        </div>
    )
}

export default UserList;