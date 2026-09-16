# Glance

Glance is a premium travel booking website for travellers who want to choose a destination and stay with confidence, without sorting through noisy, inconsistent accommodation listings.

The product combines editorial destination discovery with a focused hotel booking flow. Travellers can explore places by mood, compare curated stays by price and rating, inspect rooms and amenities, save favourites, and complete a realistic reservation journey in one continuous experience.

Glance is currently a frontend product demo. It demonstrates the user experience and interaction model of a premium booking service; it does not connect to a live inventory provider, payment gateway, authentication system, or booking backend.

## The problem Glance solves

Travel booking often makes users assemble a decision from fragmented information: destination inspiration in one place, hotel comparison in another, unclear fees, inconsistent descriptions, and a booking form that feels disconnected from the research that came before it.

Glance addresses that problem with a guided discovery-to-booking flow:

1. **Discover** a destination through visual, editorial content and travel moods.
2. **Explore** destination context, highlights, practical notes, and available stays.
3. **Compare** hotels using consistent cards, rates, guest ratings, room options, amenities, and location details.
4. **Shortlist** stays with a browser-persisted favourites list.
5. **Decide** from a detailed hotel page with gallery, rooms, pricing, and availability inputs.
6. **Book** through validated guest and contact details, followed by a confirmation view.

This keeps inspiration, evaluation, and booking within the same product language instead of treating them as separate experiences.

## Product capabilities

- Premium responsive travel interface for desktop, tablet, and mobile layouts
- Home page with hero search, curated destinations, featured stays, travel moods, trust content, and calls to action
- Destination catalogue with search, mood filters, and sorting
- Destination detail pages with editorial descriptions, history, highlights, practical planning notes, and related stays
- Stay catalogue with URL-driven filters for destination, mood, dates, and guests
- Hotel detail pages with image gallery, amenities, ratings, room types, nightly rates, and reservation actions
- Favourites workflow backed by React context and browser `localStorage`
- Checkout form with date, guest, room, and contact validation
- Client-side booking reference and confirmation flow
- Contact form, FAQ, About, and privacy policy pages
- Shared header, footer, page headings, cards, image handling, rating badges, calendar, and search components
- Route-aware scroll restoration for a consistent page transition experience

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home and editorial discovery experience |
| `/destination` | Searchable and filterable destination catalogue |
| `/destpage/:id` | Destination detail and related stays |
| `/stays` | Curated stay catalogue and search results |
| `/hotel/:id` | Hotel details, rooms, amenities, pricing, and reservation entry point |
| `/checkout/:hotelId` | Guest, date, room, and booking details form |
| `/booking/:ref` | Client-side booking confirmation |
| `/favorites` | Saved hotel shortlist |
| `/aboutus` | Glance story, values, and product approach |
| `/contact` | Contact details, FAQ, and demo contact form |
| `/privacypolicy` | Privacy information |

The legacy `/booknow/:id` path redirects users to `/stays` so older links still land in the current discovery flow.

## Technical architecture

Glance is a single-page React application built with Vite. The application is component-driven so the same interaction patterns and visual rules can be reused across discovery, comparison, and booking surfaces.

### Application shell

- `src/main.jsx` mounts the React application in `StrictMode`.
- `src/App.jsx` owns the router, shared page shell, route definitions, and scroll-to-top behavior.
- `Header` and `Footer` wrap every route through the shared layout.
- `WishlistProvider` supplies favourites state to hotel cards, detail pages, navigation, and the favourites page.

### Data model

The current catalogue is local and static, which keeps the demo deterministic and easy to run:

- `src/data/destinations.js` contains destination identity, editorial copy, images, highlights, history, and practical travel notes.
- `src/data/hotels.js` contains hotel identity, destination relationships, descriptions, images, amenities, ratings, review counts, room types, and pricing.
- `src/data/categories.js` defines stay and travel categories used by discovery filters.
- `src/list.js` remains a compatibility module for catalogue exports and summary information.

The data modules expose lookup helpers so route parameters and related content can resolve records without duplicating catalogue logic inside page components.

### State and persistence

- Search and stay filters are represented in URL query parameters. This makes filtered results navigable, refreshable, and shareable.
- Favourites are held in `WishlistContext.jsx` and persisted under `glance-wishlist` in browser storage.
- Checkout validates user input in the browser, creates a demo booking reference, and stores the booking under `glance-bookings`.
- The confirmation page reads that local record, so demo bookings are available only in the same browser and device.
- The contact form simulates submission locally. No contact message is sent to a server.

This architecture separates product behavior from backend concerns. A production version could replace the static data helpers and local storage adapter with API calls, authenticated user state, inventory checks, payment processing, and server-side booking persistence without changing the overall route model.

## Design and interaction system

The interface uses an editorial premium-travel direction rather than a generic marketplace layout. Tailwind CSS provides utility composition while `src/index.css` and `tailwind.config.js` define the design tokens, typography, colors, spacing, shadows, and motion used throughout the product.

Framer Motion supports page and card transitions. Reusable components such as `HotelCard`, `FavoriteButton`, `RatingBadge`, `SearchBar`, `Calendar`, `Heading`, `SectionHeading`, and `Img` keep common interactions visually and behaviorally consistent.

Font Awesome icons are loaded through the CDN entry in `index.html` and used for navigation, amenities, controls, and status communication.

## Technology stack

- **React 19** for the component model and UI state
- **React Router DOM 7.6** for client-side routing and URL-based navigation
- **Vite 6** for development and production bundling
- **Tailwind CSS 3** for responsive styling and design-token utilities
- **Framer Motion 13** for motion and transition states
- **ESLint 9** with React and React Hooks rules for code quality
- **PostCSS and Autoprefixer** for CSS processing and browser compatibility

## Getting started

### Requirements

- Node.js 18 or newer
- npm

### Install and run

```bash
npm install
npm run dev
```

Vite will print the local development URL in the terminal.

### Available scripts

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build in dist/
npm run lint     # Run ESLint across the project
npm run preview  # Preview the production build locally
```

## Deployment

The repository includes `vercel.json` with a single-page application rewrite so direct navigation to client-side routes works correctly on Vercel. The project can be deployed by importing the repository into Vercel and using the default Vite build settings.

For another hosting provider, configure equivalent history-fallback behavior so paths such as `/hotel/:id` and `/checkout/:hotelId` resolve to the application entry point.

## Project structure

```text
glance/
├── public/                       # Public static files
├── src/
│   ├── assets/                   # Local image assets
│   ├── components/
│   │   ├── AboutUs/              # About and product story pages
│   │   ├── Booking/              # Checkout and confirmation
│   │   ├── Contact/              # Contact, FAQ, and contact form
│   │   ├── Destinations/         # Destination catalogue and details
│   │   ├── Favorites/            # Saved stays view
│   │   ├── Header-Footer/        # Shared site chrome
│   │   ├── Home/                 # Homepage sections
│   │   ├── Hotel/                # Stay catalogue and hotel details
│   │   ├── PrivacyPolicy/        # Privacy page
│   │   ├── Reusable-components/  # Shared UI primitives
│   │   └── Search/               # Search bar and calendar
│   ├── context/                  # Cross-page React state
│   ├── data/                     # Destination, hotel, and category data
│   ├── App.jsx                   # Router and application shell
│   ├── index.css                 # Global styles and design tokens
│   ├── list.js                   # Catalogue compatibility exports
│   └── main.jsx                  # React entry point
├── index.html
├── tailwind.config.js
├── vite.config.js
├── vercel.json
└── package.json
```

## Demo boundaries and future production work

Glance is a polished frontend booking concept, not a live travel marketplace. Prices, ratings, availability, booking references, and contact submission are illustrative. There is currently no:

- live hotel inventory or availability synchronization
- user account or authentication system
- payment provider integration
- server-side booking database
- email or contact delivery service
- real-time price, tax, or cancellation policy calculation

A production roadmap would connect the existing experience to a backend inventory API, authenticated profiles, secure checkout, server-side validation, payment webhooks, transactional email, and observability around search and booking conversion.

## Credits and license

Glance was designed and developed by Fiza Shakil. Images and external media are used for demonstration purposes according to their respective sources and licenses.

