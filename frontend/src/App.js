import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import About from "./Pages/About";
import banner_women from "./Components/Assets/banner_women.jpeg";
import banner_men from "./Components/Assets/banner_mens.jpeg";
import banner_kids from "./Components/Assets/banner_kids.jpeg";
import banner_about from "./Components/Assets/banner_about.jpeg";
import banner_contacts from "./Components/Assets/banner_contacts.jpeg"
import Contacts from "./Pages/Contacts";
import ScrollToTop from "./Components/ScrollToTop";
import NewCollections from "./Components/NewCollections/NewCollections";
import Success from "./Pages/StripePayment/Success";
import Cancel from "./Pages/StripePayment/Cancel";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./Pages/TermsConditions/TermsConditions";
// import "@stripe/stripe-js"

function App() {

  return (
    <div className="main-background">
      <BrowserRouter>
        <ScrollToTop/>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<><Navbar /><Shop /><Footer /></>} />
		  <Route path="/payment-successful" element={localStorage.getItem("auth-token") ? <Success/> : <><Navbar /><Shop /><Footer /></>}/>
		  <Route path="/payment-cancel" element={localStorage.getItem("auth-token") ? <Cancel/> : <><Navbar /><Shop /><Footer /></>}/>
		  <Route path="/new-collection" element={<><Navbar /><NewCollections/><Footer /></>}/>
          <Route path="/mens" element={<><Navbar /><ShopCategory banner={banner_men} category="men" /><Footer /></>}/>
          <Route path="/womans" element={<><Navbar /><ShopCategory banner={banner_women} category="women" /><Footer /></>}/>
          <Route path="/kids" element={<><Navbar /><ShopCategory banner={banner_kids} category="kid" /><Footer /></>}/>
          <Route path="/about" element={<><Navbar /><About banner={banner_about} /><Footer /></>} />
          <Route path="/contacts" element={<><Navbar /><Contacts banner={banner_contacts}/><Footer /></>}/>
          <Route path="/product" element={<><Navbar /><Product /><Footer /></>}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<><Navbar /><Cart /><Footer /></>} />
          <Route path="/login" element={<><Navbar /><LoginSignup /><Footer /></>} />
          <Route path="/privacypolicy" element={<><Navbar /><PrivacyPolicy /><Footer /></>} />
          <Route path="/termsconditions" element={<><Navbar /><TermsConditions /><Footer /></>} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
