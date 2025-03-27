import  { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const FavoriteContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  return useContext(FavoriteContext);
}

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (car) => {
    setFavorites((prevFavorites) => [...prevFavorites, car]);
  };

  const removeFavorite = (carId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((car) => car.carId !== carId));
  };

  const isFavorite = (carId) => {
    return favorites.some((car) => car.carId === carId);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

FavoriteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
