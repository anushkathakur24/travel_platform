import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <div className="hero">
        <h1>TravelConnect</h1>
        <p className="lead">
          Discover stays, restaurants, and travel buddies — all in one place
        </p>
        <Button
          variant="warning"
          size="lg"
          onClick={() => navigate("/accommodations")}
        >
          Start Exploring
        </Button>
      </div>

      {/* Features Section */}
      <Container className="mt-5">
        <h2 className="section-title text-center">What We Offer</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="text-center p-3">
              <Card.Body>
                <Card.Title>🏨 Accommodations</Card.Title>
                <Card.Text>
                  Find budget and premium stays across popular destinations.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="text-center p-3">
              <Card.Body>
                <Card.Title>🍽 Restaurants</Card.Title>
                <Card.Text>
                  Discover top-rated restaurants and local cuisines.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="text-center p-3">
              <Card.Body>
                <Card.Title>🧍 Travel Buddies</Card.Title>
                <Card.Text>
                  Connect with like-minded travelers going your way.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Testimonials Section */}
      <Container className="mt-5">
        <h2 className="section-title text-center">What Our Users Say</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="p-3">
              <Card.Text>
                “TravelConnect helped me plan my Goa trip effortlessly. Loved the UI!”
              </Card.Text>
              <strong>— Ananya, Student</strong>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="p-3">
              <Card.Text>
                “Finding restaurants and travel buddies in one place is a great idea.”
              </Card.Text>
              <strong>— Rahul, Solo Traveler</strong>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="p-3">
              <Card.Text>
                “The platform feels modern and easy to use. Excited for AI features.”
              </Card.Text>
              <strong>— Meera, Freelancer</strong>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* AI Travel Assistant Section */}
      <Container className="mt-5 mb-5">
        <h2 className="section-title text-center">AI Travel Assistant</h2>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="p-4 text-center">
              <h5>🤖 Smart Travel Recommendations</h5>
              <p>
                Our AI-powered assistant will suggest destinations, stays, and
                restaurants based on your preferences, budget, and travel history.
              </p>
              <Button variant="primary" disabled>
                Coming Soon
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}