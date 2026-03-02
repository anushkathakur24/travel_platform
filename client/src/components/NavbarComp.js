import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function NavbarComp({ toggleDarkMode }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>TravelConnect</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto align-items-center">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/accommodations">Stays</Nav.Link>
          <Nav.Link as={Link} to="/restaurants">Food</Nav.Link>
          <Nav.Link as={Link} to="/buddies">Buddies</Nav.Link>

          <Nav.Link onClick={toggleDarkMode} title="Toggle Dark Mode">🌙</Nav.Link>

          <Nav.Link as={Link} to="/login" className="btn btn-outline-light btn-sm ms-2">
            Login
          </Nav.Link>
          <Nav.Link as={Link} to="/signup" className="btn btn-warning btn-sm ms-2">
            Sign Up
          </Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;