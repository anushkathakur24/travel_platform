import { Container, Form, Button, Card } from "react-bootstrap";

export default function Login() {
  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "400px" }} className="p-4">
        <h3 className="text-center mb-3">Login</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
          </Form.Group>

          <Button variant="primary" className="w-100">
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
}