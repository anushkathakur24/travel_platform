import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import NavbarComp from "./components/NavbarComp";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Accommodations from "./pages/Accommodations";
import Restaurants from "./pages/Restaurants";
import TravelBuddies from "./pages/TravelBuddies";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chatbot from "./components/Chatbot";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AuthProvider>
      <div className={darkMode ? "dark-mode" : ""}>
        <Router>
          <NavbarComp toggleDarkMode={() => setDarkMode(!darkMode)} />
          <Routes>
            <Route path="/"               element={<Home />} />
            <Route path="/accommodations" element={<Accommodations />} />
            <Route path="/restaurants"    element={<Restaurants />} />
            <Route path="/buddies"        element={<TravelBuddies />} />
            <Route path="/login"          element={<Login />} />
            <Route path="/signup"         element={<Signup />} />
          </Routes>
          <Footer />
          <Chatbot />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
