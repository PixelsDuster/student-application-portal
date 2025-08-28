import { Component } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import { connect } from "react-redux"
import { hideLoginDialog, authenticateUser } from "../../redux/slices/authSlice"
import type { RootState, AppDispatch } from "../../redux/store"
import { ClipLoader } from "react-spinners"

interface Props {
  show: boolean
  loginPending: boolean
  dispatch: AppDispatch
}

interface State {
  userID: string,
  password: string
}

const mapStateToProps = (state: RootState) => ({
  show: state.auth.showLoginDialog,
  loginPending: state.auth.loginPending
})

class UserSessionWidget extends Component<Props, State> {
  constructor(props: Props){
    super(props)
    this.state = {
      userID: '',
      password: ''
    }
  }

  handleClose = () => {
    this.props.dispatch(hideLoginDialog())
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    this.setState({ [name]: value } as Pick<State, keyof State>)
  }
  
  handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { userID, password } = this.state
    this.props.dispatch(authenticateUser({ userID, password }))
  }

  render() {
    return (
      <Modal id="LoginDialog" show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.loginPending ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "150px" }}>
              <ClipLoader color="#0d6efd" size={50} />
            </div>
          ) : (
            <Form onSubmit={this.handleLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>User ID</Form.Label>
                <Form.Control id="LoginDialogUserIDText" type="text" placeholder="Enter UserID" name="userID" value={this.state.userID} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control id="LoginDialogPasswordText" type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
              </Form.Group>
              <Button id="PerformLoginButton" variant="primary" type="submit">Submit</Button>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default connect(mapStateToProps)(UserSessionWidget)
