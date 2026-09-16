import React from 'react'
import { Link } from 'react-router-dom'
import list from '../../list'

const socials = [
  { href: 'https://www.facebook.com', icon: 'fa-brands fa-facebook-f', label: 'Facebook' },
  { href: 'https://www.instagram.com', icon: 'fa-brands fa-instagram', label: 'Instagram' },
  { href: 'https://www.x.com', icon: 'fa-brands fa-x-twitter', label: 'Twitter / X' },
  { href: 'https://www.linkedin.com', icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn' },
  { href: 'https://www.tiktok.com', icon: 'fa-brands fa-tiktok', label: 'TikTok' },
]

const Footer = () => {
  const topDestinations = list.slice(0, 4)

  return (
    <footer className="border-t border-line bg-cream-alt">
      <div className="container-page py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <Link to="/" className="font-display text-4xl font-semibold tracking-tight text-ink" aria-label="Glance home">
            Glance
          </Link>
          <p className="mt-3 max-w-[240px] text-sm leading-relaxed text-stone">
            Find a stay worth travelling for  discover destinations, compare hotels, and book with confidence.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-pill border border-line bg-cream text-stone transition-all duration-300 hover:border-plum hover:text-plum"
              >
                <i className={`${s.icon} text-sm`} aria-hidden="true"></i>
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-ink">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/" className="text-stone transition-colors duration-300 hover:text-ink">Home</Link></li>
            <li><Link to="/destination" className="text-stone transition-colors duration-300 hover:text-ink">All Destinations</Link></li>
            <li><Link to="/stays" className="text-stone transition-colors duration-300 hover:text-ink">Browse Stays</Link></li>
            <li><Link to="/favorites" className="text-stone transition-colors duration-300 hover:text-ink">Saved favourites</Link></li>
            <li><Link to="/aboutus" className="text-stone transition-colors duration-300 hover:text-ink">About Glance</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-ink">Support</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/contact" className="text-stone transition-colors duration-300 hover:text-ink">Contact Us</Link></li>
            <li><Link to="/privacypolicy" className="text-stone transition-colors duration-300 hover:text-ink">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Top destinations */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-ink">Top Destinations</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {topDestinations.map((d) => (
              <li key={d.id}>
                <Link to={`/destpage/${d.id}`} className="text-stone transition-colors duration-300 hover:text-ink">
                  {d.destName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-taupe sm:flex-row">
          <p>Made by Fiza Shakil  All Rights Reserved</p>
          <p>Demo product  hotel data is illustrative.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer