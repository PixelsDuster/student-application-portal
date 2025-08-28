import Button from "react-bootstrap/Button"
import { useDispatch } from "react-redux"
import { showLoginDialog } from "../../redux/slices/authSlice"
import type { AppDispatch } from "../../redux/store"

function LoginButton() {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <Button 
      id="OpenLoginDialogButton" 
      variant="success" 
      className="fw-semibold px-4 shadow-sm" 
      onClick={() => dispatch(showLoginDialog())}
    >
      Login
    </Button>
  )
}

export default LoginButton