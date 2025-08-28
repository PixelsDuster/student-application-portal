import { Component } from "react"
import { Container, Row, Col, Card } from "react-bootstrap"

class PublicPage extends Component {
    render() {
        return (
            <div className="page-content min-vh-100 d-flex align-items-center justify-content-center" id="LandingPage" style={{ background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)' }}>
                <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                    <Card className="text-center shadow-sm">
                        <Card.Body>
                        <Card.Title as="h2">Welcome to the Degree Application Portal</Card.Title>
                        <Card.Text>
                            Log in to view and manage degree courses, applications, and more. Only registered users can access the application platform.
                        </Card.Text>
                        <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
                            Need help? Contact your system administrator.
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

export default PublicPage