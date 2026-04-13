import { useState } from "react";
import { Row, Col, Button, Form, Spinner, Alert, Badge } from "react-bootstrap";
import { api } from "../utils/api";
import {
  BotIcon, UtensilsIcon, CompassIcon, CalendarIcon,
  GlobeIcon, DollarSignIcon, SparklesIcon
} from "./Icons";

const DESTINATIONS = ["Paris", "Tokyo", "Goa", "Manali", "Bali", "Maldives", "Dubai", "Kerala", "Ladakh", "Rajasthan"];

export default function AIRecommendations({ dark }) {
  const [destination, setDestination] = useState("");
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const getRecommendation = async () => {
    if (!destination.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const data = await api.post("/api/recommendations", { destination: destination.trim() });
      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to get recommendations.");
    } finally {
      setLoading(false);
    }
  };

  const textColor = dark ? "white" : "var(--brand-900)";
  const subtitleColor = dark ? "rgba(255,255,255,0.7)" : "var(--text-muted)";

  return (
    <div style={{ position: "relative" }}>
      <div className="text-center mb-4">
        <span className="section-eyebrow" style={dark ? { color: "#93c5fd" } : {}}>
          AI-Powered
        </span>
        <h2 className="section-title" style={{ color: textColor, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <BotIcon size={30} color={dark ? "#93c5fd" : "var(--brand-600)"} strokeWidth={1.6} />
          Travel Recommendations
        </h2>
        <p style={{ color: subtitleColor, maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.7 }}>
          Enter any destination and get curated food, activity, weather, and insider tips instantly.
        </p>
      </div>

      {/* Destination chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 28 }}>
        {DESTINATIONS.map((d) => (
          <button
            key={d}
            onClick={() => setDestination(d)}
            style={{
              background: destination === d
                ? "rgba(59,130,246,0.4)"
                : "rgba(255,255,255,0.1)",
              border: destination === d
                ? "1.5px solid rgba(59,130,246,0.7)"
                : "1px solid rgba(255,255,255,0.2)",
              color: dark ? "white" : (destination === d ? "var(--brand-700)" : "var(--text-muted)"),
              borderRadius: 50,
              padding: "6px 16px",
              fontSize: "0.85rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Search row */}
      <Row className="justify-content-center mb-4 g-2">
        <Col md={6}>
          <Form.Control
            size="lg"
            placeholder="Or type any destination…"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getRecommendation()}
            style={{
              background: dark ? "rgba(255,255,255,0.1)" : undefined,
              border: dark ? "1.5px solid rgba(255,255,255,0.2)" : undefined,
              color: dark ? "white" : undefined,
              borderRadius: "var(--radius-md)",
            }}
          />
        </Col>
        <Col md="auto">
          <Button
            size="lg"
            className="btn-search"
            onClick={getRecommendation}
            disabled={loading || !destination.trim()}
          >
            {loading
            ? <Spinner size="sm" animation="border" />
            : <><SparklesIcon size={16} style={{ marginRight: 7 }} /> Get Suggestions</>}
          </Button>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" style={{ maxWidth: 500, margin: "0 auto 20px" }}>
          {error}
        </Alert>
      )}

      {/* Results */}
      {result && (
        <>
          <h4 className="text-center mb-4" style={{ color: textColor, fontFamily: "'Playfair Display', serif" }}>
            Recommendations for{" "}
            <strong>{result.destination}</strong>
            {!result.found && (
              <Badge bg="secondary" className="ms-2" style={{ fontSize: "0.65rem" }}>Generic</Badge>
            )}
          </h4>

          <Row className="g-3">
            {[
              { key: "food",       Icon: UtensilsIcon,  iconColor: "#fb923c", title: "Food to Try"         },
              { key: "activities", Icon: CompassIcon,   iconColor: "#60a5fa", title: "Activities"           },
              { key: "bestTime",   Icon: CalendarIcon,  iconColor: "#4ade80", title: "Best Time to Visit"  },
              { key: "weather",    Icon: GlobeIcon,     iconColor: "#38bdf8", title: "Weather"              },
              { key: "budget",     Icon: DollarSignIcon,iconColor: "#fbbf24", title: "Budget Guide"         },
              { key: "tips",       Icon: SparklesIcon,  iconColor: "#a78bfa", title: "Insider Tips"         },
            ].filter(({ key }) => result.recommendations[key]).map(({ key, Icon, iconColor, title }, i) => (
              <Col md={4} key={key}>
                <div className={`ai-result-card animate-fade-up delay-${i + 1}`}
                  style={!dark ? {
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)"
                  } : {}}
                >
                  <div style={{ marginBottom: 10 }}>
                    <Icon size={26} color={iconColor} strokeWidth={1.6} />
                  </div>
                  <h6 style={{
                    fontWeight: 700, marginBottom: 8,
                    color: dark ? "white" : "var(--brand-900)"
                  }}>
                    {title}
                  </h6>
                  <p style={{
                    fontSize: "0.88rem", lineHeight: 1.6, margin: 0,
                    color: dark ? "rgba(255,255,255,0.78)" : "var(--text-muted)"
                  }}>
                    {result.recommendations[key]}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
}
