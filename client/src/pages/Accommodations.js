import { Card, Container, Row, Col } from "react-bootstrap";

const data = [
  { name: "Hotel Sunrise", location: "Goa", price: "₹3000/night" },
  { name: "Mountain View Inn", location: "Manali", price: "₹2500/night" }
];

export default function Accommodations() {
  return (
    <Container className="mt-4">
      <h2>Accommodations</h2>
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
                <Card.Text>{item.location}</Card.Text>
                <Card.Text>{item.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Card className="p-4 mt-4">
            <h5>Why book with TravelConnect?</h5>
            <ul>
              <li>Verified listings</li>
              <li>Budget-friendly options</li>
              <li>Future AI-based recommendations</li>
            </ul>
          </Card>
    </Container>
  );
}