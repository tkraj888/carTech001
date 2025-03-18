// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CarList from "./components/CarList";
import FavoritesPage from "./components/FavoritesPage";

const App = () => {
  return (
    <Router>
      <nav style={styles.navbar}>
        <Link to="/" style={styles.link}>All Cars</Link>
        <Link to="/favorites" style={styles.link}>Favorites ❤️</Link>
      </nav>

      <Routes>
        <Route path="/" element={<CarList />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
    padding: "15px 20px",
    backgroundColor: "#333",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    margin: "10px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "10px 15px",
    borderRadius: "6px",
    transition: "background 0.3s, color 0.3s",
  },
  linkHover: {
    backgroundColor: "#ff5a5f",
    color: "#fff",
  },
};

export default App;
