import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

import { OrderPlace } from "../service/action/action";

const stripePromise = loadStripe(
  "pk_test_51Nv06bHv7FnHz0YWZv4xGwu88nT00IMNhKikYWChBFGEEVK88FUjhJfa5ysEGmWKLBmCR3d6o3CrdDKalmUB4bLD00atH2xhnm"
);

const ShoppingCart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: any) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [userAddress, setUserAddress] = useState("");
  const [email, setEmail] = useState("");

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert(
        "Your cart is empty. Please add items to your cart before checkout."
      );
      return;
    }

    if (!userAddress && !email) {
      alert("Please fill in your address before checkout.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3000/stripe/create-checkout-session",
        {
          cartItems: cart,
          email: email,
        }
      );

      const Items = OrderPlace(cart, userAddress, email, data.id);
      await dispatch(Items);
      localStorage.removeItem("cart");

      const stripe = await stripePromise;

      if (!stripe) {
        console.error("Stripe has not loaded correctly.");
        return;
      }

      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error creating Stripe Checkout session:", error);
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        My Shopping Cart
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>UNIT PRICE</TableCell>
              <TableCell>Total PRICE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ marginRight: 16, width: 50, height: 50 }}
                    />
                    <Box>
                      <Typography>{item.name}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Typography mx={2}>{item.quantity}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary">
                    Rs {item.totalPrice}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary">
                    Rs {item.totalPrice * item.quantity}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              variant="outlined"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        </Grid>
      </Box>

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Continue Shopping
        </Button>
      </Box>
    </Box>
  );
};

export default ShoppingCart;


