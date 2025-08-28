import { Component } from "react"
import { Container, Row, Col, Card } from "react-bootstrap"

class PrivatePage extends Component {
    render() {
        return (
            <div className="page-content min-vh-100 d-flex align-items-center justify-content-center" id="StartPage" style={{ background: 'linear-gradient(135deg, #e0f7e9, #c6f1d6)' }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={10}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                <Card.Title as="h2">Welcome back!</Card.Title>
                                <Card.Text>You are now logged in. Use the navigation above to:</Card.Text>
                                <ul>
                                    <li>Explore available degree courses</li>
                                    <li>Submit a new application</li>
                                    <li>Manage your user profile (admin only)</li>
                                </ul>
                                <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
                                    All data is synced live with the backend server.
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}

export default PrivatePage