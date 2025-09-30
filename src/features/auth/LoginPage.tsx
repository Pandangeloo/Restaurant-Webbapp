import {
  Row,
  Col,
  Button,
  Form,
  useState,
  useNavigate,
  Link,
} from "../../index";
import { useAuth } from "./useAuth";

LoginPage.route = {
  path: "/login",
  menuLabel: "Sign in",
  index: 6,
  allowedRoles: ["visitor"],
};

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const u = await login(form);
      if (u.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err: any) {
      alert("Wrong: " + err.message);
    }
  };

  return (
    <Row>
      <Col>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Group>
          <Form.Group>
            <Form.Text className="text-muted">
              Don't have an account? <Link to="/register"> Sign up here</Link>
            </Form.Text>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
}
