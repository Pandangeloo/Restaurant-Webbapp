import { Col, Row } from "react-bootstrap";
import Image from "../parts/Image";

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

          <Image src="/images/MenuTest.jpg" alt="A picture of a menu"></Image>
        </Col>
      </Row>
    </>
  );
}
