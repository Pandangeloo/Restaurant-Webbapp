import { Row, Col } from "react-bootstrap";
import Image from "../parts/Image";

BookTablePage.route = {
  path: "/book-a-table",
  menuLabel: "Book a table",
  index: 2,
};

export default function BookTablePage() {
  return (
    <>
      <Row>
        <Col className="text-center">
          <h2 className="text-primary">Book a table</h2>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h5>Book a table</h5>
          <Image
            src="/images/BookTable.jpg"
            alt="A group photo of our employees."
          />
        </Col>

        <Col md={6}>
          <h5>Book a table for large groups</h5>
          <Image
            src="/images/BookTableGroup.jpg"
            alt="A group photo of our employees."
          />
        </Col>
      </Row>
    </>
  );
}
