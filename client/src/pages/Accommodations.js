import { useState, useEffect } from "react";
import {
  Container, Row, Col, Form, Button, Badge, Spinner, Alert
} from "react-bootstrap";
import { api } from "../utils/api";
import {
  MapPinIcon, TagIcon, DollarSignIcon, StarIcon,
  CheckCircleIcon, GlobeIcon, BotIcon, SearchIcon, BuildingIcon
} from "../components/Icons";

const TYPE_META = {
  budget:      { label: "Budget",    color: "success", dot: "#4ade80" },
  "mid-range": { label: "Mid-Range", color: "primary", dot: "#60a5fa" },
  premium:     { label: "Premium",   color: "warning", dot: "#fbbf24" },
  luxury:      { label: "Luxury",    color: "danger",  dot: "#f87171" },
};

function StarRating({ rating }) {
  const filled = Math.round(rating);
  return (
    <span style={{ display: "inline-flex", gap: 1 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} size={13} color="#f59e0b" strokeWidth={1.5} filled={i < filled} />
      ))}
    </span>
  );
}

export default function Accommodations() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [location, setLocation] = useState("");
  const [type, setType]         = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchAccommodations = async () => {
    setLoading(true); setError("");
    try {
      const params = new URLSearchParams();
      if (location.trim()) params.append("location", location.trim());
      if (type)            params.append("type", type);
      if (maxPrice)        params.append("maxPrice", maxPrice);
      const data = await api.get(`/api/accommodations?${params}`);
      setAccommodations(data.accommodations);
    } catch (err) {
      setError(err.message || "Failed to load accommodations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAccommodations(); }, []); // eslint-disable-line

  return (
    <div className="page-body">
      {/* Page Header */}
      <div className="page-header">
        <div style={{ position: "relative" }}>
          <span style={{
            display: "inline-block",
            background: "rgba(59,130,246,0.2)",
            border: "1px solid rgba(59,130,246,0.4)",
            color: "#93c5fd",
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            padding: "5px 16px",
            borderRadius: "50px",
            marginBottom: 14
          }}>Accommodations</span>
          <h1>Find Your Perfect Stay</h1>
          <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "1.05rem" }}>
            From budget bunks to luxury resorts — discover verified stays worldwide
          </p>
        </div>
      </div>

      <Container className="mt-5">
        {/* Filter Bar */}
        <div className="filter-bar animate-fade-up delay-1">
          <Form onSubmit={(e) => { e.preventDefault(); fetchAccommodations(); }}>
            <Row className="g-3 align-items-end">
              <Col md={4}>
                <Form.Label style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: 5 }}>
                  <MapPinIcon size={13} /> Location
                </Form.Label>
                <Form.Control
                  placeholder="e.g. Goa, Tokyo, Paris"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Col>
              <Col md={3}>
                <Form.Label style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: 5 }}>
                  <TagIcon size={13} /> Type
                </Form.Label>
                <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="">All types</option>
                  <option value="budget">Budget</option>
                  <option value="mid-range">Mid-Range</option>
                  <option value="premium">Premium</option>
                  <option value="luxury">Luxury</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Label style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: 5 }}>
                  <DollarSignIcon size={13} /> Max Price / night
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="₹ Max price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </Col>
              <Col md={2}>
                <Button type="submit" className="btn-search w-100">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </div>

        {/* States */}
        {loading && (
          <div className="loading-wrapper">
            <Spinner animation="border" variant="primary" style={{ width: 48, height: 48 }} />
            <p style={{ color: "var(--text-muted)" }}>Loading accommodations…</p>
          </div>
        )}

        {!loading && error && (
          <Alert variant="danger" className="animate-fade-up">{error}</Alert>
        )}

        {!loading && !error && accommodations.length === 0 && (
          <Alert variant="info" className="animate-fade-up text-center" style={{ padding: 40, borderRadius: "var(--radius-lg)" }}>
            <div style={{ marginBottom: 12 }}><SearchIcon size={40} color="var(--brand-400)" strokeWidth={1.4} /></div>
            <strong>No accommodations found.</strong><br />
            <span style={{ color: "var(--text-muted)" }}>Try adjusting your filters or search a different location.</span>
          </Alert>
        )}

        {/* Cards */}
        <Row className="g-4 pb-5">
          {!loading && accommodations.map((item, i) => {
            const meta = TYPE_META[item.type] || { label: item.type, color: "secondary", dot: "#94a3b8" };
            return (
              <Col md={4} key={item._id}>
                <div className={`accommodation-card h-100 animate-fade-up delay-${(i % 6) + 1}`}>
                  <div className="card-img-wrapper">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945"; }}
                    />
                    <div style={{
                      position: "absolute", top: 12, right: 12,
                      background: "rgba(15,23,42,0.85)",
                      backdropFilter: "blur(8px)",
                      borderRadius: 50, padding: "4px 12px",
                      color: "#fff", fontSize: "0.75rem", fontWeight: 600,
                      display: "flex", alignItems: "center", gap: 5
                    }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: meta.dot, display: "inline-block" }} />
                      {meta.label}
                    </div>
                  </div>

                  <div className="card-body" style={{ padding: "22px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <h5 className="card-title mb-0" style={{ fontSize: "1.05rem" }}>{item.name}</h5>
                    </div>

                    <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
                      <MapPinIcon size={13} color="var(--brand-400)" /> {item.location}
                    </p>

                    <div className="rating-row mb-10" style={{ marginBottom: 10 }}>
                      <StarRating rating={item.rating || 4} />
                      <span style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                        {item.rating?.toFixed(1)} ({item.reviews} reviews)
                      </span>
                    </div>

                    {item.description && (
                      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: 14, WebkitLineClamp: 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {item.description}
                      </p>
                    )}

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
                      {item.amenities?.slice(0, 3).map((a, idx) => (
                        <span key={idx} style={{
                          background: "var(--surface-3)", color: "var(--text-muted)",
                          fontSize: "0.75rem", fontWeight: 500,
                          padding: "3px 10px", borderRadius: 50,
                          border: "1px solid var(--border)"
                        }}>{a}</span>
                      ))}
                      {item.amenities?.length > 3 && (
                        <span style={{
                          background: "var(--brand-100)", color: "var(--brand-700)",
                          fontSize: "0.75rem", fontWeight: 600,
                          padding: "3px 10px", borderRadius: 50,
                        }}>+{item.amenities.length - 3}</span>
                      )}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="price-tag">{item.priceLabel}</span>
                      <button style={{
                        background: "linear-gradient(135deg, var(--brand-600), var(--brand-700))",
                        color: "#fff", border: "none",
                        borderRadius: "var(--radius-md)",
                        padding: "8px 18px", fontSize: "0.85rem",
                        fontWeight: 600, cursor: "pointer",
                        transition: "var(--transition)"
                      }}
                        onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
                        onMouseLeave={e => e.target.style.transform = "translateY(0)"}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>

        {/* Why book section */}
        {!loading && (
          <div style={{
            background: "linear-gradient(135deg, var(--brand-900), #1e3a8a)",
            borderRadius: "var(--radius-xl)",
            padding: "48px 40px",
            color: "white",
            marginBottom: 60,
            position: "relative",
            overflow: "hidden"
          }}>
            <Row className="align-items-center g-4">
              <Col md={6}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 20 }}>
                  Why Book with TravelConnect?
                </h3>
                {[
                  { Icon: CheckCircleIcon, color: "#4ade80", text: "Verified listings — real places, real prices"  },
                  { Icon: TagIcon,         color: "#60a5fa", text: "Budget to luxury — something for every traveller" },
                  { Icon: StarIcon,        color: "#fbbf24", text: "Honest ratings from genuine travellers"         },
                  { Icon: BotIcon,         color: "#a78bfa", text: "AI-based recommendations powered by MERN"       },
                ].map(({ Icon, color, text }, i) => (
                  <p key={i} style={{ color: "rgba(255,255,255,0.82)", fontSize: "0.95rem", marginBottom: 10, display: "flex", alignItems: "center", gap: 10 }}>
                    <Icon size={16} color={color} strokeWidth={2} />
                    {text}
                  </p>
                ))}
              </Col>
              <Col md={6} className="text-center">
                <div style={{ animation: "float 3s ease-in-out infinite", display: "inline-block" }}>
                  <GlobeIcon size={100} color="rgba(255,255,255,0.2)" strokeWidth={1} />
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
}
