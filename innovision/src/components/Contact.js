import { Container, Row, Col } from "react-bootstrap";
export const Contact = () => {
  return (
    <div className="contact" id="contact">
      <Container>
        <Row className="align-items-center">
          <Col size={15} sm={10}>
            <h1>For any queries contact us</h1>
            <br />
            <h3>Email :</h3>
            <h5>innovisioncsercciit@gmail.com</h5>
            <br />
            <h3>Coordinators :</h3>
            <h5 className="coordinators">
              Swastika Bose:+917044669104 Sansrita Saha:+917003612844 Atalanta
              Dey:+91 91631 75925 Srijan Mondal:+916294329864 Anamitra Sengupta:
              +919163708561
            </h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
