import { Component } from "react"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"

import { connect } from "react-redux"
import type { AppDispatch, RootState } from "../../redux/store"

import UserSessionWidget from "./UserSessionWidget"
import LoginButton from "./LoginButton"
import LogoutButton from "./LogoutButton"


interface Props {
  isAuthenticated: boolean;
  dispatch: AppDispatch;
}

class TopMenu extends Component<Props> {
    render() {
        return (
        <Navbar expand="lg" className="bg-primary navbar-dark shadow-sm">
            <Container>
                <Navbar.Brand href="#" className="fw-bold text-white">Application portal</Navbar.Brand>
                <Nav className="me-auto" />
                <div className="d-flex align-items-center gap-2">
                    <UserSessionWidget />
                    {this.props.isAuthenticated ? <LogoutButton /> : <LoginButton />}
                </div>
            </Container>
        </Navbar>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(TopMenu)