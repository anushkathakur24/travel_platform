import { Card, Container, Row, Col } from "react-bootstrap";

const data = [
  { name: "Spice Garden", cuisine: "Indian" },
  { name: "Pasta House", cuisine: "Italian" }
];

export default function Restaurants() {
  return (
    <Container className="mt-4">
      <h2>Restaurants</h2>
      <Row>
        {data.map((item, i) => (
          <Col md={4} key={i} className="mb-3">
            <Card>
                <Card.Img
                variant="top"
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.cuisine}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}