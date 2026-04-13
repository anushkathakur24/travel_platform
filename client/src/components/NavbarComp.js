import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import {
  PlaneIcon, MoonIcon, UserIcon, LogOutIcon, HomeIcon,
  BuildingIcon, UtensilsIcon, UsersIcon
} from "./Icons";

export default function NavbarComp({ toggleDarkMode }) {
  const { user, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Only be transparent on the home page — everywhere else always show solid
  const isHome = location.pathname === "/";
  const solid  = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Reset on route change
    setScrolled(window.scrollY > 30);
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const handleLogout = () => { logout(); navigate("/"); };
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/",               label: "Home",    icon: <HomeIcon size={15} /> },
    { path: "/accommodations", label: "Stays",   icon: <BuildingIcon size={15} /> },
    { path: "/restaurants",    label: "Food",    icon: <UtensilsIcon size={15} /> },
    { path: "/buddies",        label: "Buddies", icon: <UsersIcon size={15} /> },
  ];

  return (
    <Navbar
      expand="lg"
      className={`tc-navbar${solid ? " scrolled" : ""}`}
    >
      <Container>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Navbar.Brand as={Link} to="/" style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 0 }}>
            <PlaneIcon size={22} color={solid ? "#60a5fa" : "#93c5fd"} strokeWidth={1.8} />
            TravelConnect
          </Navbar.Brand>

          {user && (
            <span style={{
              display: "flex", alignItems: "center", gap: 5,
              fontSize: "0.75rem", fontWeight: 500,
              color: solid ? "rgba(255,255,255,0.55)" : "rgba(15,23,42,0.5)",
              background: solid ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.07)",
              border: `1px solid ${solid ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.1)"}`,
              borderRadius: 50, padding: "3px 10px 3px 8px",
              lineHeight: 1
            }}>
              <UserIcon size={12} color={solid ? "rgba(255,255,255,0.5)" : "rgba(15,23,42,0.45)"} />
              {user.name.split(" ")[0]}
            </span>
          )}
        </div>

        <Navbar.Toggle
          aria-controls="tc-nav"
          style={{ borderColor: solid ? "rgba(255,255,255,0.3)" : "rgba(15,23,42,0.3)" }}
        />

        <Navbar.Collapse id="tc-nav">
          <Nav className="ms-auto align-items-center gap-1">
            {navLinks.map(({ path, label, icon }) => (
              <Nav.Link
                as={Link}
                to={path}
                key={path}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  fontWeight: isActive(path) ? 600 : 400,
                  opacity: isActive(path) ? 1 : 0.85,
                }}
              >
                {icon}
                <span>{label}</span>
              </Nav.Link>
            ))}

            <Nav.Link
              onClick={toggleDarkMode}
              title="Toggle dark mode"
              style={{ display: "flex", alignItems: "center" }}
            >
              <MoonIcon size={17} />
            </Nav.Link>

            {user ? (
              <>
                <Button
                  size="sm"
                  variant="outline-light"
                  onClick={handleLogout}
                  style={{
                    borderRadius: "50px", padding: "6px 16px",
                    fontSize: "0.88rem", display: "flex",
                    alignItems: "center", gap: 6
                  }}
                >
                  <LogOutIcon size={14} />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="btn-nav-login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="btn-nav-signup">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
