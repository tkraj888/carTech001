import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Grid,
  Container,
  AppBar,
  Toolbar,
  Snackbar,
  Alert,
  Chip,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// API Base URL
const API_URL = "http://carauto01-production-8b0b.up.railway.app";

// Static Car Data
const initialCars = [
  { id: 1, name: "Tesla Model S", image: "cove.jpg", price: "$80,000", isFavorited: false, tags: ["Electric", "Luxury"] },
  { id: 2, name: "Ford Mustang", image: "cove.jpg", price: "$55,000", isFavorited: false, tags: ["Muscle", "Sports"] },
  { id: 3, name: "BMW M3", image: "cove.jpg", price: "$70,000", isFavorited: false, tags: ["Performance", "Luxury"] },
  { id: 4, name: "Toyota Supra", image: "cove.jpg", price: "$50,000", isFavorited: false, tags: ["Sports", "JDM"] },
  { id: 5, name: "Honda Civic", image: "cove.jpg", price: "$30,000", isFavorited: false, tags: ["Sports", "JDM"] },
  { id: 6, name: "Bentley Mini Cooper", image: "cove.jpg", price: "$60,000", isFavorited: false, tags: ["Performance", "Luxury"] },
];

const FavoriteCarsPage: React.FC = () => {
  const [cars, setCars] = useState(initialCars);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  // Function to save a car to favorites via API
  const saveFavoriteCar = async (carId: number) => {
    try {
      const response = await fetch(`${API_URL}/save-part/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carId, userId: 1 }), // Static user ID (make dynamic if needed)
      });

      if (!response.ok) {
        throw new Error("Failed to save favorite car.");
      }
    } catch (error) {
      console.error("Error saving favorite car:", error);
      setSnackbarMessage("Failed to save favorite car.");
    }
  };

  // Toggle favorite function
  const handleFavoriteToggle = async (carId: number, isFavorited: boolean) => {
    setCars((prevCars) =>
      prevCars.map((car) => (car.id === carId ? { ...car, isFavorited: !car.isFavorited } : car))
    );

    if (!isFavorited) {
      await saveFavoriteCar(carId);
      setSnackbarMessage("Car added to favorites!");
    } else {
      setSnackbarMessage("Car removed from favorites!");
    }
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: "black" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
            Favorite Cars
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ mt: 4, mb: 8 }}>
        <Grid container spacing={3}>
          {cars.map((car) => (
            <Grid item xs={12} sm={6} md={4} key={car.id}>
              <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
                <CardMedia component="img" height="200" image={car.image} alt={car.name} />
                <CardContent>
                  <Typography variant="h6">{car.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: {car.price}
                  </Typography>
                  <div style={{ marginTop: "8px" }}>
                    {car.tags.map((tag) => (
                      <Chip key={tag} label={tag} sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </div>
                  <IconButton
                    color={car.isFavorited ? "error" : "default"}
                    onClick={() => handleFavoriteToggle(car.id, car.isFavorited)}
                  >
                    {car.isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: "black", py: 2, position: "fixed", bottom: 0, width: "100%" }}>
        <Typography variant="body2" color="white" align="center">
          © {new Date().getFullYear()} AutoCarCarePoint. All rights reserved.
        </Typography>
      </Box>

      {/* Snackbar for feedback messages */}
      <Snackbar open={!!snackbarMessage} autoHideDuration={3000} onClose={() => setSnackbarMessage(null)}>
        <Alert onClose={() => setSnackbarMessage(null)} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FavoriteCarsPage;
