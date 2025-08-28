import { FaArrowsRotate } from 'react-icons/fa6'

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import type { RootState, AppDispatch } from "../../redux/store";
import { fetchUsers } from "../../redux/slices/userSlice";

import UsersList from "./UsersList"
import UserAdd from './UserAdd';

function UserManagement() {
    const dispatch = useDispatch<AppDispatch>()
    const userList = useSelector((state: RootState) => state.user.users)
    const error = useSelector((state: RootState) => state.user.error)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    const handleRefresh = () => {
        dispatch(fetchUsers())
    }

    return (
        <div  id="UserManagementPage" className='min-vh-100 w-100' style={{ background: 'linear-gradient(135deg, #e0f7e9, #c6f1d6)' }}>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1 className='mt-3'>User-Liste</h1>
                    <div className="d-flex gap-3">
                        <UserAdd />
                        <i className="fs-3 text-dark" role="button" title="Refresh" onClick={handleRefresh}><FaArrowsRotate /></i>
                    </div>
                </div>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <UsersList userList={userList} />
            </div>
        </div>
    )
}

export default UserManagement