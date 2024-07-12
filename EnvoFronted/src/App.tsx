import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./header_footer/Navbar";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Home from "./components/Home";
import MyCard from "./components/Product";
import ShoppingCart from "./components/AddToCart";
import Protected from "./Register/Protected";
import SignUp from "./Register/SignUp";
import Login from "./Register/Login";
import AddProduct from "./components/AddProduct";
import AdminPage from "./components/DashBoard";

const App = () => {
  return (
    <div>
      <Router>
        <Protected Component={Navbar} />
        <Routes>
          <Route path="/" element={<Protected Component={Home} />} />
          <Route path="/products" element={<Protected Component={MyCard} />} />
          <Route path="/shops" element={<Protected Component={Shop} />} />
          <Route
            path="/addCart"
            element={<Protected Component={ShoppingCart} />}
          />
          <Route path="/cart/:id" element={<Protected Component={Cart} />} />
          <Route path="/adminPanel" element={<AdminPage />} />
          <Route
            path="/addProduct"
            element={<Protected Component={AddProduct} />}
          />
          <Route path="/register" element={<SignUp />} />
          <Route path="/user/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
