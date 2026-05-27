import { useState, useEffect, useCallback } from "react";
import {
  Container, Row, Col, Button, Form, Alert, Spinner, Modal, Badge
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";
import {
  UsersIcon, MapPinIcon, CalendarIcon, UserPlusIcon,
  XIcon, PlaneIcon, CheckIcon, MailIcon
} from "../components/Icons";

/* ── tiny inline styles ── */
const TAB_BASE = {
  padding: "10px 28px",
  borderRadius: 50,
  fontWeight: 600,
  fontSize: "0.92rem",
  cursor: "pointer",
  border: "2px solid transparent",
  transition: "all 0.18s ease"
};

const AVATAR_FALLBACK = "https://randomuser.me/api/portraits/lego/1.jpg";

function getInitials(name = "") {
  return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

/* ── Requester avatar component ── */
function RequesterAvatar({ user }) {
  const [imgFailed, setImgFailed] = useState(false);
  if (user?.avatar && !imgFailed) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        onError={() => setImgFailed(true)}
        style={{
          width: 38, height: 38, borderRadius: "50%",
          objectFit: "cover", border: "2px solid var(--brand-500)"
        }}
      />
    );
  }
  return (
    <div style={{
      width: 38, height: 38, borderRadius: "50%",
      background: "linear-gradient(135deg, var(--brand-500), #6366f1)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 700, fontSize: "0.82rem",
      border: "2px solid var(--brand-500)", flexShrink: 0
    }}>
      {getInitials(user?.name)}
    </div>
  );
}

export default function TravelBuddies() {
  const { user }   = useAuth();
  const navigate   = useNavigate();

  /* ── All Buddies tab state ── */
  const [buddies,      setBuddies]      = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState("");
  const [search,       setSearch]       = useState("");
  const [connectMsg,   setConnectMsg]   = useState({ text: "", type: "" });
  const [connectingId, setConnectingId] = useState(null);

  /* ── My Buddies tab state ── */
  const [myBuddies,      setMyBuddies]      = useState([]);
  const [myLoading,      setMyLoading]      = useState(false);
  const [myError,        setMyError]        = useState("");
  const [expandedCard,   setExpandedCard]   = useState(null); // id of card showing requesters

  /* ── Shared state ── */
  const [activeTab,    setActiveTab]    = useState("all"); // "all" | "mine"
  const [showModal,    setShowModal]    = useState(false);
  const [form,         setForm]         = useState({ destination: "", dates: "", bio: "", interests: "" });
  const [formError,    setFormError]    = useState("");
  const [formLoading,  setFormLoading]  = useState(false);

  /* ─────────── Data fetchers ─────────── */
  const fetchBuddies = useCallback(async (dest = "") => {
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
  }, []);

  const fetchMyBuddies = useCallback(async () => {
    if (!user) return;
    setMyLoading(true); setMyError("");
    try {
      const data = await api.get("/api/buddies/mine");
      setMyBuddies(data.buddies);
    } catch (err) {
      setMyError(err.message || "Failed to load your listings.");
    } finally {
      setMyLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchBuddies(); }, [fetchBuddies]);

  useEffect(() => {
    if (activeTab === "mine" && user) fetchMyBuddies();
  }, [activeTab, user, fetchMyBuddies]);

  /* ─────────── Handlers ─────────── */
  const handleConnect = async (id) => {
    if (!user) { navigate("/login"); return; }
    setConnectingId(id);
    setConnectMsg({ text: "", type: "" });
    try {
      const data = await api.post(`/api/buddies/${id}/connect`, {});
      setConnectMsg({ text: data.message, type: "success" });
    } catch (err) {
      setConnectMsg({ text: err.message, type: "warning" });
    } finally {
      setConnectingId(null);
    }
  };

  const handleDeleteListing = async (id) => {
    if (!window.confirm("Delete this listing?")) return;
    try {
      await api.delete(`/api/buddies/${id}`);
      setMyBuddies(prev => prev.filter(b => b._id !== id));
    } catch (err) {
      setMyError(err.message || "Failed to delete.");
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
      // Refresh whichever tab is active
      if (activeTab === "mine") fetchMyBuddies();
      else fetchBuddies();
    } catch (err) {
      setFormError(err.message || "Failed to create listing.");
    } finally {
      setFormLoading(false);
    }
  };

  /* ─────────── Render helpers ─────────── */
  const tabStyle = (tab) => ({
    ...TAB_BASE,
    background: activeTab === tab ? "var(--brand-500)" : "var(--surface-2)",
    color: activeTab === tab ? "#fff" : "var(--text-muted)",
    borderColor: activeTab === tab ? "var(--brand-500)" : "var(--border)"
  });

  /* ══════════════════════════════════════════════════════
     MY BUDDIES SECTION — shows own listings + requesters
  ══════════════════════════════════════════════════════ */
  const MyBuddiesSection = () => {
    if (!user) {
      return (
        <Alert variant="info" className="text-center" style={{ padding: 40, borderRadius: "var(--radius-lg)" }}>
          <UserPlusIcon size={40} color="var(--brand-400)" strokeWidth={1.4} style={{ marginBottom: 12 }} />
          <p style={{ marginBottom: 16, color: "var(--text-muted)" }}>
            Log in to see your trip listings and connection requests.
          </p>
          <Button variant="primary" style={{ borderRadius: 50, padding: "10px 28px" }}
            onClick={() => navigate("/login")}>
            Log In
          </Button>
        </Alert>
      );
    }

    if (myLoading) {
      return (
        <div className="loading-wrapper">
          <Spinner animation="border" variant="primary" style={{ width: 44, height: 44 }} />
          <p style={{ color: "var(--text-muted)" }}>Loading your trips…</p>
        </div>
      );
    }

    if (myError) return <Alert variant="danger">{myError}</Alert>;

    if (myBuddies.length === 0) {
      return (
        <Alert variant="info" className="text-center animate-fade-up"
          style={{ padding: 48, borderRadius: "var(--radius-lg)" }}>
          <PlaneIcon size={44} color="var(--brand-400)" strokeWidth={1.4} style={{ marginBottom: 12 }} />
          <strong>You haven't posted any trips yet.</strong><br />
          <span style={{ color: "var(--text-muted)" }}>
            Click "Add My Trip" to create your first listing and start receiving connection requests!
          </span>
        </Alert>
      );
    }

    return (
      <Row className="g-4 pb-5">
        {myBuddies.map((item, i) => {
          const requesters = item.connectionRequests || [];
          const isExpanded = expandedCard === item._id;
          return (
            <Col md={6} lg={4} key={item._id}>
              <div className={`buddy-card h-100 animate-fade-up delay-${(i % 6) + 1}`}
                style={{ position: "relative" }}>

                {/* Connection count badge */}
                {requesters.length > 0 && (
                  <div style={{
                    position: "absolute", top: 12, right: 12, zIndex: 2,
                    background: "var(--brand-500)", color: "#fff",
                    borderRadius: 50, minWidth: 26, height: 26,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.78rem", fontWeight: 700, padding: "0 8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.25)"
                  }}>
                    {requesters.length} {requesters.length === 1 ? "request" : "requests"}
                  </div>
                )}

                <div className="buddy-img-wrapper">
                  <img
                    src={item.image || AVATAR_FALLBACK}
                    alt={item.name}
                    onError={(e) => { e.target.src = AVATAR_FALLBACK; }}
                  />
                  <span className="destination-badge" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <MapPinIcon size={12} /> {item.destination}
                  </span>
                </div>

                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <h5 style={{ fontWeight: 700, margin: 0 }}>{item.name}'s Trip</h5>
                    <span style={{
                      background: "rgba(16,185,129,0.12)",
                      color: "#6ee7b7", fontSize: "0.72rem",
                      fontWeight: 700, padding: "2px 10px",
                      borderRadius: 50, border: "1px solid rgba(16,185,129,0.3)"
                    }}>My Listing</span>
                  </div>

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

                  {/* Connection requests toggle */}
                  <Button
                    variant={requesters.length > 0 ? "primary" : "outline-secondary"}
                    className="w-100 mb-2"
                    style={{ borderRadius: 50, fontWeight: 600, fontSize: "0.88rem" }}
                    onClick={() => setExpandedCard(isExpanded ? null : item._id)}
                  >
                    <UsersIcon size={15} style={{ marginRight: 6 }} />
                    {requesters.length === 0
                      ? "No requests yet"
                      : isExpanded
                        ? "Hide Requests"
                        : `View ${requesters.length} Connection Request${requesters.length > 1 ? "s" : ""}`}
                  </Button>

                  {/* Requesters list — expanded */}
                  {isExpanded && requesters.length > 0 && (
                    <div style={{
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-md)",
                      padding: "12px 14px",
                      marginBottom: 10,
                      maxHeight: 240,
                      overflowY: "auto"
                    }}>
                      <p style={{
                        fontSize: "0.78rem", fontWeight: 700,
                        textTransform: "uppercase", letterSpacing: "1px",
                        color: "var(--text-muted)", marginBottom: 10
                      }}>
                        People who want to connect:
                      </p>
                      {requesters.map((req, idx) => (
                        <div key={req._id || idx} style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "8px 0",
                          borderBottom: idx < requesters.length - 1
                            ? "1px solid var(--border)" : "none"
                        }}>
                          <RequesterAvatar user={req} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                              {req.name}
                            </div>
                            <div style={{
                              fontSize: "0.78rem", color: "var(--text-muted)",
                              display: "flex", alignItems: "center", gap: 4,
                              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                            }}>
                              <MailIcon size={11} /> {req.email}
                            </div>
                          </div>
                          <div style={{
                            width: 28, height: 28, borderRadius: "50%",
                            background: "rgba(16,185,129,0.15)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0
                          }}>
                            <CheckIcon size={14} color="#6ee7b7" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Delete listing */}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="w-100"
                    style={{ borderRadius: 50, fontSize: "0.82rem" }}
                    onClick={() => handleDeleteListing(item._id)}
                  >
                    Remove Listing
                  </Button>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    );
  };

  /* ══════════════════════════════════════════════════════
     MAIN RENDER
  ══════════════════════════════════════════════════════ */
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

        {/* ── Tabs ── */}
        <div className="animate-fade-up" style={{
          display: "flex", alignItems: "center", gap: 10,
          marginBottom: 28, flexWrap: "wrap"
        }}>
          <button style={tabStyle("all")} onClick={() => setActiveTab("all")}>
            <UsersIcon size={15} style={{ marginRight: 7 }} />
            All Buddies
          </button>
          <button style={tabStyle("mine")} onClick={() => setActiveTab("mine")}>
            <CheckIcon size={15} style={{ marginRight: 7 }} />
            My Buddies
            {myBuddies.some(b => b.connectionRequests?.length > 0) && (
              <Badge bg="danger" style={{ marginLeft: 8, fontSize: "0.72rem" }}>
                {myBuddies.reduce((acc, b) => acc + (b.connectionRequests?.length || 0), 0)}
              </Badge>
            )}
          </button>

          <div style={{ marginLeft: "auto" }}>
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
        </div>

        {/* ── ALL BUDDIES TAB ── */}
        {activeTab === "all" && (
          <>
            {/* Search row */}
            <div className="animate-fade-up delay-1" style={{ marginBottom: 24 }}>
              <Form
                onSubmit={(e) => { e.preventDefault(); fetchBuddies(search.trim()); }}
                style={{ display: "flex", gap: 10, maxWidth: 500 }}
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
                    style={{ borderRadius: "var(--radius-md)", display: "flex", alignItems: "center" }}>
                    <XIcon size={16} />
                  </Button>
                )}
              </Form>
            </div>

            {/* Connect feedback */}
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
                <span style={{ color: "var(--text-muted)" }}>Be the first to post your trip!</span>
              </Alert>
            )}

            {/* Buddy Cards */}
            <Row className="g-4 pb-5">
              {!loading && buddies.map((item, i) => (
                <Col md={4} lg={3} key={item._id}>
                  <div className={`buddy-card h-100 animate-fade-up delay-${(i % 6) + 1}`}>
                    <div className="buddy-img-wrapper">
                      <img
                        src={item.image || AVATAR_FALLBACK}
                        alt={item.name}
                        onError={(e) => { e.target.src = AVATAR_FALLBACK; }}
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
          </>
        )}

        {/* ── MY BUDDIES TAB ── */}
        {activeTab === "mine" && <MyBuddiesSection />}

      </Container>

      {/* ── Create Trip Modal ── */}
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
