// src/pages/FavoritesPage.js
import React, { useState, useEffect } from "react";
import CarCard from "../components/CarCard";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      <h2 style={styles.header}>Favorite Cars</h2>
      <div style={styles.list}>
        {favorites.length > 0 ? (
          favorites.map((car) => <CarCard key={car.id} car={car} />)
        ) : (
          <p style={styles.empty}>No favorite cars yet!</p>
        )}
      </div>
    </div>
  );
};

const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
    },
    header: {
      textAlign: "center",
      padding: "20px",
      color: "black",
      borderRadius: "8px",
      fontSize: "24px",
      fontWeight: "bold",
    },
    list: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "0px",
      padding: "20px",
      backgroundColor: "#f8fafc",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    empty: {
      textAlign: "center",
      fontSize: "18px",
      color: "#6b7280",
      width: "100%",
      padding: "20px",
      backgroundColor: "#e5e7eb",
      borderRadius: "8px",
    },
  };
  
export default FavoritesPage;