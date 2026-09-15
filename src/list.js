export { destinations as default, getDestinationById, getDestinationBySlug } from "./data/destinations";
export {
  hotels,
  getHotelById,
  getHotelsByDestination,
  getFeaturedHotels,
} from "./data/hotels";
export { categories, getCategoryBySlug } from "./data/categories";
import { hotels } from "./data/hotels";

export const hotelStats = {
  destinationsCount: 8,
  hotelsCount: hotels.length,
  hotelCountLabel: `${hotels.length} stays`,
  demoNote: "Demo catalogue — prices and ratings are illustrative.",
};