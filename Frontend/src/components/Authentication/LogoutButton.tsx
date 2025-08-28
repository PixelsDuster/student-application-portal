import Button from "react-bootstrap/Button"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/slices/authSlice"
import type { AppDispatch } from "../../redux/store"
import { useNavigate } from "react-router-dom"
import { clearUserInfo } from "../../redux/slices/userSlice"

function LogoutButton() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearUserInfo())
    navigate("/", { replace: true })
  }

  return (
    <Button 
      id="LogoutButton" 
      variant="danger"
      className="fw-semibold px-4 shadow-sm" 
      onClick={handleLogout}
    >
      Logout
    </Button>
  )
}

export default LogoutButton