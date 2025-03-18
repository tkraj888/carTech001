// src/components/CarCard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const CarCard = ({ car }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if car is in favorites
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(storedFavorites.some((favCar) => favCar.id === car.id));
  }, [car.id]);

  const handleFavorite = async () => {
    let updatedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = updatedFavorites.filter((favCar) => favCar.id !== car.id);
    } else {
      // Add to favorites
      updatedFavorites.push(car);
    }

    // Save to local storage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);

    // Send favorite data to API
    try {
      await axios.post("http://carauto01-production-8b0b.up.railway.app/save-part/save", {
        carId: car.id,
        model: car.model,
        year: car.year,
        price: car.price,
        isFavorite: !isFavorite,
      });
      console.log("Car added to favorites!");
    } catch (error) {
      console.error("Error saving favorite:", error);
    }
  };

  return (
    <div style={styles.card}>
      <img src={car.image} alt={car.model} style={styles.image} />
      <h3>{car.year} {car.model}</h3>
      <p><strong>Condition:</strong> {car.condition}</p>
      <p><strong>Price:</strong> ₹{car.price}</p>
      <button onClick={handleFavorite} style={styles.favoriteButton}>
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    margin: "10px",
    textAlign: "center",
    width: "250px",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "5px",
  },
  favoriteButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
};

export default CarCard;
