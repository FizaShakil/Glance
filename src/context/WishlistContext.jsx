import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext({ wishlist: [], toggleWishlist: () => {} });

const STORAGE_KEY = "glance-wishlist";

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      /* ignore quota errors */
    }
  }, [wishlist]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const value = useMemo(
    () => ({ wishlist, toggleWishlist }),
    [wishlist]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);