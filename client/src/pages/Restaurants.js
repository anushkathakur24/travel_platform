import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const restaurantImages = [
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
];

export default function Restaurants() {
  const [place, setPlace] = useState("Paris");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get coordinates from place name
  const getCoordinates = async (placeName) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        placeName
      )}`
    );
    const data = await res.json();

    if (data.length === 0) return null;

    return { lat: data[0].lat, lon: data[0].lon };
  };

  // Fetch restaurants from OpenStreetMap
  const fetchRestaurants = async (lat, lon) => {
    const radius = 2000;

    const query = `
      [out:json];
      node["amenity"="restaurant"](around:${radius},${lat},${lon});
      out;
    `;

    const url =
      "https://overpass-api.de/api/interpreter?data=" +
      encodeURIComponent(query);

    const res = await fetch(url);
    const data = await res.json();

    return data.elements.filter((r) => r.tags?.name);
  };

  // Search function
  const search = useCallback(async () => {
    setLoading(true);

    const coords = await getCoordinates(place);

    if (!coords) {
      setRestaurants([]);
      setLoading(false);
      return;
    }

    const data = await fetchRestaurants(coords.lat, coords.lon);

    const finalData = data.map((r) => ({
      id: r.id,
      name: r.tags.name,
      cuisine: r.tags.cuisine || "Restaurant",
      address: r.tags["addr:street"] || place,
      image:
        restaurantImages[Math.floor(Math.random() * restaurantImages.length)]
    }));

    setRestaurants(finalData);
    setLoading(false);
  }, [place]);

  useEffect(() => {
    search();
  }, [search]);

  return (
    <div className="page-body">
    <>
      {/* Page Header */}
      <div className="hero-small text-center">
        <h1>Restaurants in {place}</h1>
        <p>Find great dining spots wherever you travel</p>
      </div>

      <Container className="mt-4">

        {/* Search */}
        <Row className="justify-content-center mb-4">
          <Col md={6}>
            <Form.Control
              size="lg"
              placeholder="Enter a city (e.g., Paris, Tokyo, Delhi)"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </Col>

          <Col md="auto">
            <Button size="lg" onClick={search}>
              Search
            </Button>
          </Col>
        </Row>

        {/* Loading */}
        {loading && (
          <h4 className="text-center mt-5">Loading restaurants...</h4>
        )}

        {/* Empty */}
        {!loading && restaurants.length === 0 && (
          <h5 className="text-center">No restaurants found.</h5>
        )}

        {/* Restaurant Cards */}
        <Row className="g-4">
          {restaurants.map((r) => (
            <Col md={4} lg={3} key={r.id}>
              <Card className="h-100 shadow restaurant-card">
                <Card.Img
                  variant="top"
                  src={r.image}
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <Card.Body>
                  <Card.Title>{r.name}</Card.Title>

                  <p className="text-muted mb-1">{r.cuisine}</p>

                  <small>{r.address}</small>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
    </div>
  );
}