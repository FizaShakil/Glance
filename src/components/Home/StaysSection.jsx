import React, { useState } from "react";
import SectionHeading from "../Reusable-components/SectionHeading";
import HotelCard from "../Hotel/HotelCard";
import { getFeaturedHotels } from "../../data/hotels";

const StaysSection = () => {
  const featured = getFeaturedHotels();
  const [visible, setVisible] = useState(6);

  return (
    <section className="bg-cream-alt py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Hand-picked stays"
          title="Stays people keep coming back to"
          subtitle="A shortlist of favourites across our catalogue — every one picked for place, calm, and a little bit of magic."
          action={{ to: "/stays", label: "Browse all stays" }}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, visible).map((hotel, i) => (
            <HotelCard key={hotel.id} hotel={hotel} index={i} />
          ))}
        </div>

        {featured.length > visible && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + 3)}
              className="btn-ghost !px-8 !py-3.5"
            >
              Show more stays
              <i className="fas fa-chevron-down text-xs" aria-hidden="true"></i>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default StaysSection;