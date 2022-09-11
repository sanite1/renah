import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Categories from './Components/Categories';
import ProductDescription from './Components/ProductPreview';
import Cart from './Components/Cart';
import PrivacyPolicy from './Components/PrivacyPolicy';
import TermsAndConditions from "./Components/TermsAndConditions";
import Admin from "./Admin/Admin";


function App() {
  
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}

        <div className="">
          <Routes>

            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Signup/>} />
            <Route exact path="/categories/:categoryType" element={<Categories/>} />
            <Route exact path="/products/:id" element={<ProductDescription/>} />
            <Route exact path="/cart" element={<Cart/>} />
            <Route exact path="/privacy policy" element={<PrivacyPolicy/>} />
            <Route exact path="/terms and conditions" element={<TermsAndConditions/>} />
            <Route exact path="/admin" element={<Admin/>} />
            {/* <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/categories/:categoryType">
              <Categories />
            </Route>
            <Route path="/products/:id">
              <ProductDescription />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/privacy policy">
              <PrivacyPolicy />
            </Route>
            <Route path="/terms and conditions">
              <TermsAndConditions />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route> */}

          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
    
  );
}

export default App;
