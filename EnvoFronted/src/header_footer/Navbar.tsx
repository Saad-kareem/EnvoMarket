import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FiMenu } from "react-icons/fi";
import "./navbar.css";
import { Logout } from "@mui/icons-material";
import { Button } from "@mui/material";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/user/login");
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="Navbar-Menu" onClick={toggleMenu}>
          <FiMenu />
        </div>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        {(!isMenuOpen || windowWidth > 768) && (
          <>
            <div className="navbar-left">
              <div className="search-bar">
                <select className="category-select">
                  <option>All Categories</option>
                </select>
                <input
                  type="text"
                  placeholder="Search"
                  className="search-input"
                />

                <button className="search-button">
                  <ZoomOutIcon />
                </button>
              </div>
            </div>
            <div className="navbar-right">
              <div>
                <div className="contact-info">
                  <span className="ConatactNumber">+392496581580</span>
                  <span className="contact-price">CALL US FREE</span>
                </div>
                <div className="shipping-info">
                  <span className="ConatactNumber">FREE SHIPPING</span>
                  <span className="contact-price">ON ORDERS OVER $150.0</span>
                </div>
              </div>
              <div className="user-actions">
                <div className="user-icon">
                  {token ? (
                    <Button
                      size="small"
                      variant="outlined"
                      color="success"
                      onClick={logout}
                    >
                      <Logout style={{ fontSize: "15px" }} />
                    </Button>
                  ) : (
                    <NavLink to="/user/login">
                      <Button size="small" variant="outlined" color="success">
                        Sign In
                      </Button>
                    </NavLink>
                  )}
                </div>

                <div className="wishlist-icon">
                  <FavoriteBorderIcon />
                </div>
                <div className="cart-icon">
                  <NavLink to="/addCart">
                    <ShoppingCartIcon />
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="navbar-links">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/shops">Shop</NavLink>
              <NavLink to="/products">Products</NavLink>
              <NavLink to="/contact">Contact Us</NavLink>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
