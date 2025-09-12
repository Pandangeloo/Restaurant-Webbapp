import { Row, Col } from "react-bootstrap";

EventsPage.route = {
  path: "/events",
  menuLabel: "Events",
  index: 3,
};

export default function EventsPage() {
  return (
    <>
      <Row>
        <Col>
          <h2 className="text-center">Events</h2>
        </Col>
      </Row>
    </>
  );
}
