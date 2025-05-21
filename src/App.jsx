import React, {useEffect} from "react"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useLocation } from "react-router-dom"
import AboutUs from "./components/AboutUs/AboutUs"
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy"
import Destinations from "./components/Destinations/Destinations"
import Header from "./components/Header-Footer/Header"
import Footer from "./components/Header-Footer/Footer"
import Home from "./components/Home/Home"
import Contact from "./components/Contact/Contact"
import DestPage from "./components/Destinations/DestPage"
import BookNow from "./components/Destinations/BookNow"

function App() {
  return (
    <>
      <div>
        <Router>
          <ScrollToTop />
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/aboutus' element={<AboutUs/>}/>
            <Route path='/destination' element={<Destinations/>}/>
            <Route path='/privacypolicy' element={<PrivacyPolicy/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path="/destpage/:id" element={<DestPage/>}/>
            <Route path='/booknow/:id' element={<BookNow/>}/>
          </Routes>
          <Footer/>
        </Router>
      </div>
    </>
  )
}
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
      window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default App
