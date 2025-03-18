// src/components/CarList.js
import React from "react";
import CarCard from "./CarCard";

const CarList = () => {
  // Mock car data (instead of an API)
  const cars = [
    {
      id: 1,
      model: "Toyota Corolla",
      year: 2022,
      price: "15,00,000",
      condition: "New",
      image: "./2022 Toyota Corolla.jpg",
    },
    {
      id: 2,
      model: "Honda Civic",
      year: 2021,
      price: "14,50,000",
      condition: "Used",
      image: "./2021 Honda Civic.jpeg",
    },
    {
      id: 3,
      model: "Ford Mustang",
      year: 2023,
      price: "60,00,000",
      condition: "New",
      image: "./2023 Ford Mustang.jpeg",
    },
    {
      id: 4,
      model: "Hyundai Creta",
      year: 2020,
      price: "10,00,000",
      condition: "Used",
      image: "./2020 Hyundai Creta.jpeg",
    },
    {
      id: 5,
      model: "Mercedes Benz",
      year: 2023,
      price: "1,20,00,000",
      condition: "New",
      image: "./2023 Mercedes Benz.jpeg",
    },
  ];

  return (
    <div style={styles.list}>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

const styles = {
  list: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
};

export default CarList;
