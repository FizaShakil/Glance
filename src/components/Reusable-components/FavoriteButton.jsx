import React from "react";
import { motion } from "framer-motion";

const FavoriteButton = ({ active = false, onClick, label = "Save to favourites" }) => {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.8 }}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      aria-label={label}
      aria-pressed={active}
      className={`inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full backdrop-blur-md transition-colors duration-300 ${
        active ? "bg-iris text-white" : "bg-cream/85 text-ink hover:bg-white"
      }`}
    >
      <motion.i
        key={active ? "on" : "off"}
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className={`fas ${active ? "fa-heart" : "fa-regular fa-heart"} text-sm`}
        aria-hidden="true"
      ></motion.i>
    </motion.button>
  );
};

export default FavoriteButton;