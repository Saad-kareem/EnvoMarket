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
import Success from "./components/OderSuccess";
import PaidOrders from "./components/Order";
import NotFound from "./components/ErrorPage";
import UnPaidOrders from "./components/UnPaidOrders";
import ContactForm from "./Register/Contact";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<MyCard />} />
          <Route path="/shops" element={<Shop />} />
          <Route path="/addCart" element={<ShoppingCart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route
            path="/adminPanel"
            element={<Protected Component={AdminPage} />}
          />
          <Route
            path="/addProduct"
            element={<Protected Component={AddProduct} />}
          />
          <Route
            path="/UnPaidOrders"
            element={<Protected Component={UnPaidOrders} />}
          />
          <Route
            path="/orders"
            element={<Protected Component={PaidOrders} />}
          />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
