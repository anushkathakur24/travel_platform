import { Card, Container, Row, Col } from "react-bootstrap";

const data = [
  { name: "Aarav", destination: "Goa", dates: "10–15 March" },
  { name: "Meera", destination: "Manali", dates: "20–25 March" }
];

export default function TravelBuddies() {
  return (
    <Container className="mt-4">
      <h2>Find Travel Buddies</h2>
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
                <Card.Text>Destination: {item.destination}</Card.Text>
                <Card.Text>Dates: {item.dates}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}