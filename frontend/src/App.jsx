import './App.css'
import { useState, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { ContactFormContextProvider } from './context/ContactFormContext';
import ContactFormModal from './components/ContactFormModal';
import ScrollToTop from './components/ScrollToTop'

const About = lazy(() => import('./pages/About'));
const Cart = lazy(() => import('./pages/Cart'));
const Profile = lazy(() => import('./pages/Profile'));
const MyOrders = lazy(() => import('./pages/MyOrders'));
const Careers = lazy(() => import('./pages/Careers'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));

function App() {
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);

  return (
    <ContactFormContextProvider>
      <Router>
        <ScrollToTop />
        <Navbar isServicesModalOpen={isServicesModalOpen} setIsServicesModalOpen={setIsServicesModalOpen} />
        <Suspense fallback={null}>
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
        </Suspense>
        <ContactFormModal />
        <Footer />
      </Router>
    </ContactFormContextProvider>
  )
}
export default App
