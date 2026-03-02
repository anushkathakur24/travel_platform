import { Container, Form, Button, Card } from "react-bootstrap";

export default function Signup() {
  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "400px" }} className="p-4">
        <h3 className="text-center mb-3">Sign Up</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Create password" />
          </Form.Group>

          <Button variant="success" className="w-100">
            Create Account
          </Button>
        </Form>
      </Card>
    </Container>
  );
}