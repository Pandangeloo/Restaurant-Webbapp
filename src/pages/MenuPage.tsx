import { Col, Row } from "react-bootstrap";

MenuPage.route = {
  path: "/menu",
  menuLabel: "Menu",
  index: 2,
};

export default function MenuPage() {
  return (
    <>
      <Row>
        <Col>
          <h1>Hello</h1>
        </Col>
      </Row>
    </>
  );
}
