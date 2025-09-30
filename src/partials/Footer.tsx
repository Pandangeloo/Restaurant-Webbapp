import { Container, Row, Col } from "../index";
import SocialIcons from "../parts/FooterParts/SocialIcons";

export default function Footer() {
  return (
    <footer>
      <Container fluid>
        <Row>
          <Col className="py-3 text-bg-primary">
            <SocialIcons />
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3 text-bg-primary">
            © The Axolotl {new Date().getFullYear()}
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
