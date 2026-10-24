import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import MyOrders from './pages/MyOrders'
import Careers from './pages/Careers'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import RefundPolicy from './pages/RefundPolicy'
import Disclaimer from './pages/Disclaimer'
import { ContactFormContextProvider } from './context/ContactFormContext';
import ContactFormModal from './components/ContactFormModal';

import ScrollToTop from './components/ScrollToTop'

function App() {
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);

  return (
    <ContactFormContextProvider>
      <Router>
        <ScrollToTop />
        <Navbar isServicesModalOpen={isServicesModalOpen} setIsServicesModalOpen={setIsServicesModalOpen} />
        <Routes>
          <Route path="/" element={<Home openServicesModal={() => setIsServicesModalOpen(true)} />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
        <ContactFormModal />
        <Footer />
      </Router>
    </ContactFormContextProvider>
  )
}
export default App
