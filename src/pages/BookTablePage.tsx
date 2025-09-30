import { Row, Col } from "../index";
import SmallTableForm from "../parts/BookingParts/SmallTableForm";
import LargeTableForm from "../parts/BookingParts/LargeTableForm";

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
          <SmallTableForm></SmallTableForm>
        </Col>
        <Col md={6}>
          <LargeTableForm></LargeTableForm>
        </Col>
      </Row>
    </>
  );
}
