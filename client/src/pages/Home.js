import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AIRecommendations from "../components/AIRecommendations";
import {
  BuildingIcon, UtensilsIcon, UsersIcon, SparklesIcon,
  GlobeIcon, MapPinIcon, ArrowRightIcon, CheckCircleIcon,
  SearchIcon, BotIcon, CompassIcon
} from "../components/Icons";

const features = [
  {
    Icon: BuildingIcon, iconClass: "blue",
    title: "Curated Stays",
    desc: "Handpicked accommodations from budget hostels to luxury resorts across top destinations."
  },
  {
    Icon: UtensilsIcon, iconClass: "amber",
    title: "Local Restaurants",
    desc: "Discover authentic dining using live OpenStreetMap data — street food to fine dining."
  },
  {
    Icon: UsersIcon, iconClass: "green",
    title: "Travel Buddies",
    desc: "Connect with fellow travellers heading your way and split costs, memories, and adventures."
  },
  {
    Icon: SparklesIcon, iconClass: "purple",
    title: "AI Recommendations",
    desc: "Get personalised destination guides — food, activities, weather, budget, and insider tips."
  },
];

const stats = [
  { number: "10+",  label: "Destinations",    Icon: GlobeIcon   },
  { number: "9+",   label: "Verified Stays",  Icon: BuildingIcon },
  { number: "6+",   label: "Travel Buddies",  Icon: UsersIcon    },
  { number: "100%", label: "MERN Stack",      Icon: CompassIcon  },
];

const steps = [
  {
    step: "01", Icon: SearchIcon, title: "Discover",
    desc: "Search stays and restaurants by destination, budget, and type using our live-data filters."
  },
  {
    step: "02", Icon: BotIcon, title: "Get AI Advice",
    desc: "Enter any destination and get curated food, activity, weather, and budget recommendations."
  },
  {
    step: "03", Icon: UsersIcon, title: "Connect & Go",
    desc: "Find travel buddies heading your way, send a connect request, and explore together."
  },
];

const testimonials = [
  {
    text: "TravelConnect helped me plan my Goa trip effortlessly. The accommodation filters are amazing!",
    name: "Ananya Sharma", role: "Student, Mumbai",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    text: "Finding travel companions and restaurants all in one platform is a game changer. Love it.",
    name: "Rahul Mehta", role: "Solo Traveller",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    text: "The AI recommendations for Tokyo were spot-on. Felt like having a local guide in my pocket!",
    name: "Meera Iyer", role: "Freelancer, Bangalore",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-body">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <span className="hero-eyebrow">
            <GlobeIcon size={13} style={{ marginRight: 6 }} />
            Your All-in-One Travel Platform
          </span>
          <h1>
            Explore the World<br />
            <span className="gradient-word">Your Way</span>
          </h1>
          <p className="lead">
            Discover stays, find restaurants, meet travel buddies, and get
            AI-powered destination guides — all in one place.
          </p>
          <div className="hero-actions">
            <Button className="btn-hero-primary" onClick={() => navigate("/accommodations")}
              style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <BuildingIcon size={18} color="#fff" />
              Find a Stay
            </Button>
            <Button className="btn-hero-secondary" onClick={() => navigate("/buddies")}
              style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <UsersIcon size={18} color="#fff" />
              Find Buddies
            </Button>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>SCROLL</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────── */}
      <section className="stats-bar">
        <Container>
          <Row className="g-4">
            {stats.map((s, i) => (
              <Col xs={6} md={3} key={i}>
                <div className={`stat-item animate-fade-up delay-${i + 1}`}>
                  <div style={{ marginBottom: 8, opacity: 0.6 }}>
                    <s.Icon size={22} color="#60a5fa" strokeWidth={1.5} />
                  </div>
                  <div className="stat-number">{s.number}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <section className="section-wrapper">
        <Container>
          <div className="text-center">
            <span className="section-eyebrow">What We Offer</span>
            <h2 className="section-title">
              Everything You Need to{" "}
              <span className="highlight">Travel Smarter</span>
            </h2>
            <p className="section-subtitle">
              A complete travel companion — from finding the perfect stay
              to connecting with people who share your wanderlust.
            </p>
          </div>
          <Row className="g-4">
            {features.map((f, i) => (
              <Col md={6} lg={3} key={i}>
                <div className={`feature-card animate-fade-up delay-${i + 2}`}>
                  <div className={`feature-icon ${f.iconClass}`}>
                    <f.Icon size={28} strokeWidth={1.6} />
                  </div>
                  <h5>{f.title}</h5>
                  <p>{f.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="section-wrapper bg-alt">
        <Container>
          <div className="text-center">
            <span className="section-eyebrow">How It Works</span>
            <h2 className="section-title">Plan Your Trip in 3 Steps</h2>
            <p className="section-subtitle">
              From inspiration to departure — TravelConnect makes every step simple.
            </p>
          </div>
          <Row className="g-4 justify-content-center">
            {steps.map((item, i) => (
              <Col md={4} key={i}>
                <div className={`feature-card text-center animate-fade-up delay-${i + 2}`}
                  style={{ padding: "40px 28px" }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.75rem", fontWeight: 700,
                    color: "var(--brand-600)", letterSpacing: 1,
                    margin: "0 auto 16px"
                  }}>
                    {item.step}
                  </div>
                  <div style={{
                    width: 52, height: 52,
                    background: "var(--surface-3)",
                    borderRadius: 14,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 16px"
                  }}>
                    <item.Icon size={24} color="var(--brand-600)" strokeWidth={1.6} />
                  </div>
                  <h5 style={{ fontWeight: 700, marginBottom: 10 }}>{item.title}</h5>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.93rem", margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── AI RECOMMENDATIONS ───────────────────────────────────── */}
      <section className="section-wrapper">
        <Container>
          <div className="ai-section">
            <AIRecommendations dark />
          </div>
        </Container>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="section-wrapper bg-alt">
        <Container>
          <div className="text-center">
            <span className="section-eyebrow">Testimonials</span>
            <h2 className="section-title">
              Loved by <span className="highlight">Travellers</span>
            </h2>
            <p className="section-subtitle">
              Real stories from people who planned unforgettable trips with TravelConnect.
            </p>
          </div>
          <Row className="g-4">
            {testimonials.map((t, i) => (
              <Col md={4} key={i}>
                <div className={`testimonial-card animate-fade-up delay-${i + 2}`}>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-author">
                    <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                    <div>
                      <p className="testimonial-name">{t.name}</p>
                      <p className="testimonial-role">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────── */}
      <section className="section-wrapper">
        <Container>
          <div style={{
            background: "linear-gradient(135deg, var(--brand-700), #7c3aed)",
            borderRadius: "var(--radius-xl)", padding: "64px 40px",
            textAlign: "center", color: "white",
            position: "relative", overflow: "hidden"
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.06), transparent)"
            }} />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800,
              marginBottom: 16, position: "relative"
            }}>
              Ready to Start Your Adventure?
            </h2>
            <p style={{
              color: "rgba(255,255,255,0.8)", fontSize: "1.05rem",
              marginBottom: 36, position: "relative"
            }}>
              Join TravelConnect today and discover a smarter way to travel.
            </p>
            <div style={{
              display: "flex", gap: 14,
              justifyContent: "center", flexWrap: "wrap",
              position: "relative"
            }}>
              <Button
                onClick={() => navigate("/signup")}
                style={{
                  background: "white", color: "var(--brand-700)",
                  border: "none", borderRadius: 50,
                  padding: "13px 32px", fontWeight: 700,
                  display: "flex", alignItems: "center", gap: 8,
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                Create Free Account
                <ArrowRightIcon size={16} color="var(--brand-700)" />
              </Button>
              <Button
                className="btn-hero-secondary"
                onClick={() => navigate("/accommodations")}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <MapPinIcon size={16} color="#fff" />
                Explore Stays
              </Button>
            </div>

            {/* Why us bullets */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 24,
              justifyContent: "center", marginTop: 40,
              position: "relative"
            }}>
              {[
                "Verified listings",
                "Budget to luxury",
                "AI-powered recommendations",
                "Find travel companions"
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 7,
                  color: "rgba(255,255,255,0.82)", fontSize: "0.9rem"
                }}>
                  <CheckCircleIcon size={15} color="#4ade80" strokeWidth={2} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}
