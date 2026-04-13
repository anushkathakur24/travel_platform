import { useState, useEffect } from "react";
import {
  Container, Row, Col, Button, Form, Alert, Spinner, Modal
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";
import { UsersIcon, MapPinIcon, CalendarIcon, UserPlusIcon, XIcon, PlaneIcon } from "../components/Icons";

export default function TravelBuddies() {
  const { user }   = useAuth();
  const navigate   = useNavigate();

  const [buddies,      setBuddies]      = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState("");
  const [search,       setSearch]       = useState("");
  const [connectMsg,   setConnectMsg]   = useState({ text: "", type: "" });
  const [connectingId, setConnectingId] = useState(null);
  const [showModal,    setShowModal]    = useState(false);
  const [form,         setForm]         = useState({ destination: "", dates: "", bio: "", interests: "" });
  const [formError,    setFormError]    = useState("");
  const [formLoading,  setFormLoading]  = useState(false);

  const fetchBuddies = async (dest = "") => {
    setLoading(true); setError("");
    try {
      const q = dest ? `?destination=${encodeURIComponent(dest)}` : "";
      const data = await api.get(`/api/buddies${q}`);
      setBuddies(data.buddies);
    } catch (err) {
      setError(err.message || "Failed to load travel buddies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBuddies(); }, []);

  const handleConnect = async (id) => {
    if (!user) { navigate("/login"); return; }
    setConnectingId(id);
    try {
      const data = await api.post(`/api/buddies/${id}/connect`, {});
      setConnectMsg({ text: data.message, type: "success" });
    } catch (err) {
      setConnectMsg({ text: err.message, type: "warning" });
    } finally {
      setConnectingId(null);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault(); setFormError(""); setFormLoading(true);
    try {
      await api.post("/api/buddies", {
        ...form,
        interests: form.interests
          ? form.interests.split(",").map(s => s.trim()).filter(Boolean)
          : []
      });
      setShowModal(false);
      setForm({ destination: "", dates: "", bio: "", interests: "" });
      fetchBuddies();
    } catch (err) {
      setFormError(err.message || "Failed to create listing.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="page-body">
      {/* Page Header */}
      <div className="page-header">
        <div style={{ position: "relative" }}>
          <span style={{
            display: "inline-block",
            background: "rgba(16,185,129,0.2)",
            border: "1px solid rgba(16,185,129,0.4)",
            color: "#6ee7b7",
            fontSize: "0.78rem", fontWeight: 700,
            letterSpacing: "2px", textTransform: "uppercase",
            padding: "5px 16px", borderRadius: "50px", marginBottom: 14
          }}>Community</span>
          <h1>Find Travel Buddies</h1>
          <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "1.05rem" }}>
            Connect with like-minded travellers heading to the same destination
          </p>
        </div>
      </div>

      <Container className="mt-5">
        {/* Actions row */}
        <div className="animate-fade-up delay-1" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, marginBottom: 28 }}>
          <Form
            onSubmit={(e) => { e.preventDefault(); fetchBuddies(search.trim()); }}
            style={{ display: "flex", gap: 10, flex: 1, maxWidth: 500 }}
          >
            <Form.Control
              placeholder="Search by destination…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" className="btn-search" style={{ whiteSpace: "nowrap" }}>
              Search
            </Button>
            {search && (
              <Button variant="outline-secondary"
                onClick={() => { setSearch(""); fetchBuddies(); }}
                style={{ borderRadius: "var(--radius-md)", display: "flex", alignItems: "center" }}
              >
                <XIcon size={16} />
              </Button>
            )}
          </Form>

          {user ? (
            <Button variant="success" onClick={() => setShowModal(true)}
              style={{ borderRadius: 50, padding: "10px 24px", fontWeight: 600 }}>
              + Add My Trip
            </Button>
          ) : (
            <Button variant="outline-primary" onClick={() => navigate("/login")}
              style={{ borderRadius: 50, padding: "10px 24px" }}>
              Login to Add Trip
            </Button>
          )}
        </div>

        {/* Feedback */}
        {connectMsg.text && (
          <Alert variant={connectMsg.type} dismissible
            onClose={() => setConnectMsg({ text: "", type: "" })}
            className="animate-fade-up">
            {connectMsg.text}
          </Alert>
        )}

        {/* States */}
        {loading && (
          <div className="loading-wrapper">
            <Spinner animation="border" variant="primary" style={{ width: 48, height: 48 }} />
            <p style={{ color: "var(--text-muted)" }}>Finding travel companions…</p>
          </div>
        )}

        {!loading && error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && buddies.length === 0 && (
          <Alert variant="info" className="text-center animate-fade-up"
            style={{ padding: 48, borderRadius: "var(--radius-lg)" }}>
            <div style={{ marginBottom: 12 }}><UsersIcon size={44} color="var(--brand-400)" strokeWidth={1.4} /></div>
            <strong>No travel buddies found.</strong><br />
            <span style={{ color: "var(--text-muted)" }}>
              Be the first to post your trip!
            </span>
          </Alert>
        )}

        {/* Buddy Cards */}
        <Row className="g-4 pb-5">
          {!loading && buddies.map((item, i) => (
            <Col md={4} lg={3} key={item._id}>
              <div className={`buddy-card h-100 animate-fade-up delay-${(i % 6) + 1}`}>
                <div className="buddy-img-wrapper">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => { e.target.src = "https://randomuser.me/api/portraits/lego/1.jpg"; }}
                  />
                  <span className="destination-badge" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <MapPinIcon size={12} /> {item.destination}
                  </span>
                </div>

                <div style={{ padding: "20px" }}>
                  <h5 style={{ fontWeight: 700, marginBottom: 4 }}>{item.name}</h5>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
                    <CalendarIcon size={13} color="var(--brand-400)" /> {item.dates}
                  </p>

                  {item.bio && (
                    <p style={{
                      fontSize: "0.85rem", color: "var(--text-muted)",
                      lineHeight: 1.5, marginBottom: 12,
                      display: "-webkit-box", WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical", overflow: "hidden"
                    }}>
                      {item.bio}
                    </p>
                  )}

                  {item.interests?.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
                      {item.interests.slice(0, 3).map((interest, j) => (
                        <span key={j} style={{
                          background: "var(--surface-3)", color: "var(--text-muted)",
                          fontSize: "0.73rem", fontWeight: 500,
                          padding: "3px 10px", borderRadius: 50,
                          border: "1px solid var(--border)"
                        }}>{interest}</span>
                      ))}
                    </div>
                  )}

                  <Button
                    variant="primary"
                    className="w-100"
                    disabled={connectingId === item._id}
                    onClick={() => handleConnect(item._id)}
                    style={{ borderRadius: 50, fontWeight: 600, fontSize: "0.9rem" }}
                  >
                    {connectingId === item._id
                      ? <Spinner size="sm" animation="border" />
                      : <><UserPlusIcon size={15} style={{ marginRight: 6 }} /> Connect</>}
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Create Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="md">
        <Modal.Header closeButton style={{ borderBottom: "1px solid var(--border)", padding: "20px 24px" }}>
          <Modal.Title style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
            <MapPinIcon size={18} color="var(--brand-500)" /> Add Your Trip
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "24px" }}>
          {formError && <Alert variant="danger">{formError}</Alert>}
          <Form onSubmit={handleCreate}>
            {[
              { name: "destination", label: "Destination *", placeholder: "e.g. Goa, Paris, Bali" },
              { name: "dates",       label: "Travel Dates *", placeholder: "e.g. 10–15 March" },
            ].map(f => (
              <Form.Group key={f.name} className="mb-3">
                <Form.Label style={{ fontWeight: 600, fontSize: "0.9rem" }}>{f.label}</Form.Label>
                <Form.Control
                  name={f.name}
                  placeholder={f.placeholder}
                  value={form[f.name]}
                  onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                  required
                />
              </Form.Group>
            ))}
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 600, fontSize: "0.9rem" }}>About Your Trip</Form.Label>
              <Form.Control as="textarea" rows={3} name="bio"
                placeholder="Tell others your plans…"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: 600, fontSize: "0.9rem" }}>Interests (comma-separated)</Form.Label>
              <Form.Control name="interests"
                placeholder="e.g. Trekking, Photography, Food"
                value={form.interests}
                onChange={(e) => setForm({ ...form, interests: e.target.value })}
              />
            </Form.Group>
            <Button type="submit" variant="success" className="w-100"
              style={{ borderRadius: 50, padding: "12px", fontWeight: 600 }}
              disabled={formLoading}>
              {formLoading
                ? <Spinner size="sm" animation="border" />
                : <><PlaneIcon size={16} style={{ marginRight: 6 }} /> Post My Trip</>}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
