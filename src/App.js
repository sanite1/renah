import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';
import Categories from './Categories';
import ProductDescription from './ProductPreview';
import Cart from './Cart';

function App() {
  
  return (
    <Router>
      <div className="App">
        <Navbar />

        <div className="">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/categories">
              <Categories />
            </Route>
            <Route path="/products/:id">
              <ProductDescription />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>

          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
    
  );
}

export default App;
