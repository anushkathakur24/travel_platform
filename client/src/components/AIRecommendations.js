import { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const suggestions = {
  Paris: {
    food: "Croissants, Escargots, French Wine",
    activities: "Visit Eiffel Tower, Louvre Museum, Seine River Cruise",
    bestTime: "April – June, September – October"
  },
  Tokyo: {
    food: "Sushi, Ramen, Tempura",
    activities: "Shibuya Crossing, Tokyo Skytree, Cherry Blossom Parks",
    bestTime: "March – May, October – November"
  },
  Goa: {
    food: "Seafood, Prawn Curry, Bebinca",
    activities: "Beach hopping, Water sports, Night markets",
    bestTime: "November – February"
  },
  Manali: {
    food: "Himachali dishes, Trout fish",
    activities: "Solang Valley, Rohtang Pass, Trekking",
    bestTime: "March – June"
  }
};

export default function AIRecommendations() {

  const [destination, setDestination] = useState("");
  const [result, setResult] = useState(null);

  const generateRecommendation = () => {

    if (suggestions[destination]) {
      setResult(suggestions[destination]);
    } else {
      setResult({
        food: "Local cuisine exploration",
        activities: "Sightseeing, local markets, cultural tours",
        bestTime: "Depends on the destination"
      });
    }
  };

  return (
    <Container className="mt-5">

      <h2 className="section-title text-center">
        🤖 AI Travel Recommendations
      </h2>

      <Row className="justify-content-center mb-4">

        <Col md={6}>
          <Form.Control
            size="lg"
            placeholder="Enter destination (Paris, Goa, Tokyo...)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </Col>

        <Col md="auto">
          <Button size="lg" onClick={generateRecommendation}>
            Get AI Suggestions
          </Button>
        </Col>

      </Row>

      {result && (
        <Row className="g-4">

          <Col md={4}>
            <Card className="p-3 shadow">
              <Card.Body>
                <Card.Title>🍽 Food to Try</Card.Title>
                <Card.Text>{result.food}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="p-3 shadow">
              <Card.Body>
                <Card.Title>🎯 Activities</Card.Title>
                <Card.Text>{result.activities}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="p-3 shadow">
              <Card.Body>
                <Card.Title>📅 Best Time to Visit</Card.Title>
                <Card.Text>{result.bestTime}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      )}

    </Container>
  );
}