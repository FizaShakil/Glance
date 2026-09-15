import React, { useEffect } from "react"
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AboutUs from "./components/AboutUs/AboutUs"
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy"
import Destinations from "./components/Destinations/Destinations"
import Header from "./components/Header-Footer/Header"
import Footer from "./components/Header-Footer/Footer"
import Home from "./components/Home/Home"
import Contact from "./components/Contact/Contact"
import DestPage from "./components/Destinations/DestPage"
import Stays from "./components/Hotel/Stays"
import HotelDetail from "./components/Hotel/HotelDetail"
import Favorites from "./components/Favorites/Favorites"
import BookingCheckout from "./components/Booking/BookingCheckout"
import BookingConfirmation from "./components/Booking/BookingConfirmation"
import { WishlistProvider } from "./context/WishlistContext"

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function AppRoutes() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/aboutus' element={<AboutUs/>}/>
          <Route path='/destination' element={<Destinations/>}/>
          <Route path='/privacypolicy' element={<PrivacyPolicy/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path="/destpage/:id" element={<DestPage/>}/>
          <Route path="/booknow/:id" element={<Navigate to="/stays" replace/>}/>
          <Route path='/checkout/:hotelId' element={<BookingCheckout/>}/>
          <Route path='/booking/:ref' element={<BookingConfirmation/>}/>
          <Route path='/stays' element={<Stays/>}/>
          <Route path='/hotel/:id' element={<HotelDetail/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <WishlistProvider>
        <AppRoutes />
      </WishlistProvider>
    </Router>
  )
}

export default App