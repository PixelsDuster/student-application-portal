import { Component } from "react"
import { LinkContainer } from 'react-router-bootstrap'
import { FaHome, FaUsers, FaBook, FaClipboardList } from 'react-icons/fa'
import Nav from "react-bootstrap/Nav"

import { connect } from "react-redux"
import type { RootState } from "../redux/store"

interface Props {
  isAdmin: boolean;
}

const mapStateToProps = (state: RootState) => ({
    isAdmin: state.user.isAdministrator
})

class SideBar extends Component<Props> {
    render() {
        return (
            <div className="d-flex flex-column bg-light p-1 vh-100" style={{ width: '70px' }}>
                <ul className="nav nav-pills flex-column mb-auto">
                    {/* Home icon */}
                    <li className="nav-item mb-2">
                        <LinkContainer to="/">
                            <Nav.Link id="OpenStartPageButton" className="nav-link text-dark d-flex align-items-center">
                                <FaHome className="me-2" size={24} title="Home" />
                            </Nav.Link>
                        </LinkContainer>
                    </li>

                    {/* User Management icon */}
                    {this.props.isAdmin && (
                        <li className="nav-item mb-2">
                            <LinkContainer to="/UserManagement">
                                <Nav.Link id="OpenUserManagementPageButton" className="nav-link text-dark d-flex align-items-center">
                                    <FaUsers className="me-2" size={24} title="User Management" />
                                </Nav.Link>
                            </LinkContainer>
                        </li>
                    )}

                    {/* DegreeCourse Management icon */}
                    <li className="nav-item mb-2">
                        <LinkContainer to="/DegreeCourseManagement">
                            <Nav.Link id="OpenDegreeCourseManagementPageButton" className="nav-link text-dark d-flex align-items-center">
                                <FaBook className="me-2" size={24} title="DegreeCourse Management" />
                            </Nav.Link>
                        </LinkContainer>
                    </li>

                    {/* Application Management icon */}
                    <li className="nav-item mb-2">    
                        <LinkContainer to="/DegreeCourseApplicationManagement">
                            <Nav.Link id="OpenDegreeCourseApplicationManagementPageButton" className="nav-link text-dark d-flex align-items-center">
                                <FaClipboardList className="me-2" size={24} title="DegreeApplication Management" />
                            </Nav.Link>
                        </LinkContainer>
                    </li>
                </ul>
            </div>
        )
    }
}

export default connect(mapStateToProps)(SideBar)