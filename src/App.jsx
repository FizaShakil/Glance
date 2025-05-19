import React from "react"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AboutUs from "./components/AboutUs/AboutUs"
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy"
import Destinations from "./components/Destinations/Destinations"
import Header from "./components/Header-Footer/Header"
import Footer from "./components/Header-Footer/Footer"
import Home from "./components/Home/Home"
import Contact from "./components/Contact/Contact"
import DestPage from "./components/Destinations/DestPage"
function App() {

  return (
    <>
      <div>
        <Router>
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/aboutus' element={<AboutUs/>}/>
            <Route path='/destination' element={<Destinations/>}/>
            <Route path='/privacypolicy' element={<PrivacyPolicy/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path="/destpage/:id" element={<DestPage/>}/>
          </Routes>
          <Footer/>
        </Router>
      </div>
    </>
  )
}

export default App
