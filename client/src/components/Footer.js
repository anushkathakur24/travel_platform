import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { PlaneIcon, CodeIcon, ServerIcon, DatabaseIcon, ShieldCheckIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="tc-footer">
      <Container>
        <Row className="g-5">
          {/* Brand col */}
          <Col md={4}>
            <div className="footer-brand" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <PlaneIcon size={22} color="#60a5fa" strokeWidth={1.8} />
              TravelConnect
            </div>
            <p className="footer-tagline">
              Your all-in-one MERN stack travel platform — discover stays,
              restaurants, travel buddies, and AI-powered destination guides.
            </p>
            <span className="footer-badge">Full Stack Web Dev Project</span>
          </Col>

          {/* Explore */}
          <Col md={2}>
            <h6>Explore</h6>
            <Link to="/">Home</Link>
            <Link to="/accommodations">Stays</Link>
            <Link to="/restaurants">Restaurants</Link>
            <Link to="/buddies">Travel Buddies</Link>
          </Col>

          {/* Account */}
          <Col md={2}>
            <h6>Account</h6>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </Col>

          {/* Tech Stack */}
          <Col md={4}>
            <h6>Tech Stack</h6>
            {[
              { Icon: CodeIcon,        color: "#60a5fa", label: "Frontend",  value: "React 19 + React-Bootstrap" },
              { Icon: ServerIcon,      color: "#4ade80", label: "Backend",   value: "Node.js + Express.js 5"     },
              { Icon: DatabaseIcon,    color: "#86efac", label: "Database",  value: "MongoDB + Mongoose 9"       },
              { Icon: ShieldCheckIcon, color: "#f9a8d4", label: "Auth",      value: "JWT + bcryptjs"             },
            ].map(({ Icon, color, label, value }) => (
              <p key={label} style={{ marginBottom: 8, color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: 8 }}>
                <Icon size={14} color={color} strokeWidth={2} />
                <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{label}</span>
                <span>{value}</span>
              </p>
            ))}
          </Col>
        </Row>

        <hr className="footer-divider" />

        <div className="footer-bottom d-flex flex-wrap justify-content-between align-items-center gap-2">
          <span>© 2026 TravelConnect — ICT 3230 Full Stack Web Development</span>
          <span>Group 19 · Section E · Manipal Institute of Technology</span>
        </div>
      </Container>
    </footer>
  );
}
