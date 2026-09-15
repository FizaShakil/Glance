import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/destination", label: "Destinations" },
  { to: "/stays", label: "Stays" },
  { to: "/aboutus", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  const onHome = pathname === "/";
  const isHero = onHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav
      className={`top-0 z-50 transition-all duration-500 ${
        onHome ? "fixed left-0 right-0" : "sticky"
      } ${
        isHero
          ? "bg-transparent"
          : "bg-ink/90 backdrop-blur-md shadow-soft"
      }`}
    >
      <div className="container-page">
        <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "h-16" : onHome ? "h-20" : "h-[76px]"}`}>
          {/* Logo */}
          <Link to="/" className="flex items-baseline gap-2" aria-label="Glance home">
            <span className="font-display text-[28px] font-semibold leading-none tracking-tight text-cream">
              Glance
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-cream after:transition-all after:duration-300 hover:after:w-full ${
                    isActive ? "text-cream after:w-full" : "text-cream/65 hover:text-cream"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `hidden h-10 w-10 items-center justify-center rounded-pill transition-colors duration-300 md:inline-flex ${
                  isActive ? "bg-cream/15 text-cream" : "text-cream/70 hover:bg-cream/10 hover:text-cream"
                }`
              }
              aria-label="Saved favourites"
              title="Saved favourites"
            >
              <i className="fa-regular fa-heart text-base" aria-hidden="true"></i>
            </NavLink>

            <Link to="/stays" className="btn-light hidden md:inline-flex !px-5 !py-2.5">
              <i className="fas fa-search text-xs mr-1" aria-hidden="true"></i>
              Book a Stay
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-pill text-cream/85 transition-colors duration-300 hover:bg-cream/10 hover:text-cream md:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-lg`} aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-cream/10 bg-ink md:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-base px-4 py-3 text-base transition-colors duration-300 ${
                      isActive ? "bg-ink-soft text-cream" : "text-cream/70 hover:bg-ink-soft hover:text-cream"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to="/favorites"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-base px-4 py-3 text-base transition-colors duration-300 ${
                    isActive ? "bg-ink-soft text-cream" : "text-cream/70 hover:bg-ink-soft hover:text-cream"
                  }`
                }
              >
                <i className="fa-regular fa-heart mr-2" aria-hidden="true"></i>
                Saved favourites
              </NavLink>
              <Link
                to="/stays"
                onClick={() => setIsMenuOpen(false)}
                className="btn-light mt-3 !w-full"
              >
                <i className="fas fa-search text-xs mr-1" aria-hidden="true"></i>
                Book a Stay
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;