import { Form, Row, Col, Button, FormSelect } from "react-bootstrap";

FormPage.route = {
  path: "/form",
  menuLabel: "Form",
  index: 3,
};

// Todo: When submitting form - message to admin? is it possible? or just that admin has an extra page that this info is available. add info in database? and admin can se if they are contacted. remove. edit and so on.
export default function FormPage() {
  return (
    <Row>
      <Col>
        <Form>
          <h1>What kind of event?</h1>
          <p>After your inquiry we will be in touch in 3-5 workdays</p>
          <Form.Group>
            <Form.Label>
              <FormSelect>
                <option value="null">Choose your event</option>
                <option value="null">Wedding</option>
                <option value="null">Engagement party</option>
                <option value="null">Private Dinners</option>
                <option value="null">Party</option>
              </FormSelect>
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label className="d-block">
              <p>Your information</p>
              <Form.Control
                type="text"
                name="nameInput"
                placeholder="First name"
              ></Form.Control>
              <Form.Control
                type="text"
                name="nameInput"
                placeholder="Last name"
              ></Form.Control>
            </Form.Label>
            <Form.Label>
              <Form.Control
                type="number" // TODO: is this correct??
                name="mobileNumber"
                placeholder="Mobilenumber"
              ></Form.Control>
            </Form.Label>
          </Form.Group>
          <Button className="mt-4 float-end"> Send Inquiry</Button>
        </Form>
      </Col>
    </Row>
  );
}
