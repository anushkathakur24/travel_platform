import { Card, Container, Row, Col, Button } from "react-bootstrap";

const data = [
  {
    name: "Aarav",
    destination: "Goa",
    dates: "10–15 March",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Meera",
    destination: "Manali",
    dates: "20–25 March",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Kabir",
    destination: "Bali",
    dates: "5–12 April",
    image: "https://randomuser.me/api/portraits/men/65.jpg"
  },
  {
    name: "Ananya",
    destination: "Paris",
    dates: "18–25 April",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

export default function TravelBuddies() {
  return (
    <Container className="mt-5">

      <h2 className="section-title text-center mb-4">
       Find Travel Buddies
      </h2>

      <Row className="g-4 justify-content-center">

        {data.map((item, i) => (
          <Col md={3} key={i}>

            <Card className="shadow text-center h-100">

              <Card.Img
                variant="top"
                src={item.image}
                style={{
                  height: "220px",
                  objectFit: "cover"
                }}
              />

              <Card.Body>

                <Card.Title>{item.name}</Card.Title>

                <Card.Text>
                  📍 Destination: {item.destination}
                </Card.Text>

                <Card.Text>
                  📅 Dates: {item.dates}
                </Card.Text>

                <Button variant="primary">
                  Connect
                </Button>

              </Card.Body>

            </Card>

          </Col>
        ))}

      </Row>

    </Container>
  );
}