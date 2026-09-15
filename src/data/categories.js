export const categories = [
  {
    slug: "beach",
    label: "Beach escapes",
    short: "Beach",
    icon: "fa-solid fa-umbrella-beach",
    description: "Sun-soaked sand and easy mornings.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "romantic",
    label: "Romantic stays",
    short: "Romantic",
    icon: "fa-solid fa-heart",
    description: "Sunset views built for two.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "city",
    label: "City breaks",
    short: "City",
    icon: "fa-solid fa-city",
    description: "Culture, cafés, and skyline energy.",
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "nature",
    label: "Nature retreats",
    short: "Nature",
    icon: "fa-solid fa-leaf",
    description: "Forests, mountains, and clean air.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "luxury",
    label: "Luxury escapes",
    short: "Luxury",
    icon: "fa-solid fa-gem",
    description: "Five-star detail, memorable stays.",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "hidden",
    label: "Hidden gems",
    short: "Hidden",
    icon: "fa-solid fa-compass",
    description: "Quieter places worth discovering.",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80",
  },
];

export const getCategoryBySlug = (slug) =>
  categories.find((c) => c.slug === slug);