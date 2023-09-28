import { Container, Row, Col } from 'react-bootstrap';
import "../assets/css/footer.css";
import sutlogo from "../assets/images/sutlogo.png"
const Footer = () => {
    return (
        <footer className='footbg'>
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <img src={sutlogo} alt="logo"
                            style={{ width: "250px", height: "100px", marginLeft: "20px", marginTop: "30px", marginBottom: "30px" }}
                        />
                    </Col>
                    <Col xs={12} md={6} style={{ width: "250px", height: "100px", marginTop: "30px", marginBottom: "30px" }}>
                    </Col>
                    <Col xs={12} md={6} style={{ width: "250px", height: "100px", marginTop: "30px", marginBottom: "30px" }}>
                        <h5>Contact Us</h5>
                        <p>Email: example@example.com</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;