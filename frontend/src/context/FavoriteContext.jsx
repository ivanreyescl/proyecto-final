import { createContext, useState } from 'react';

export const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorite = (productToAdd) => {
    setFavorites((prevFavorites) => {
      const productInFavorite = prevFavorites.find(product => product.id === productToAdd.id);
      if (productInFavorite) {
        return prevFavorites.map(product =>
          product.id === productToAdd.id ? { ...product, count: product.count + 1 } : product
        );
      } else {
        return [...prevFavorites, { ...productToAdd, count: 1 }];
      }
    });
  };

  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some(fav => fav.id === product.id);
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== product.id);
      } else {
        return [...prevFavorites, { ...product, count: 1 }];
      }
    });
  };

  const increaseQuantity = (id) => {
    setFavorites(favorites.map(product =>
      product.id === id ? { ...product, count: product.count + 1 } : product
    ));
  };

  const decreaseQuantity = (id) => {
    setFavorites(favorites.reduce((acc, product) => {
      if (product.id === id) {
        if (product.count > 1) {
          acc.push({ ...product, count: product.count - 1 });
        }
      } else {
        acc.push(product);
      }
      return acc;
    }, []));
  };

  const total = favorites.reduce((acc, product) => acc + product.price * product.count, 0);

  return (
    <FavoriteContext.Provider value={{
      favorites,
      setFavorites,
      addToFavorite,
      toggleFavorite,
      increaseQuantity,
      decreaseQuantity,
      total
    }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;
