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
import { OrderPlace } from "../service/action/action";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: any) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalPrices = cart.reduce(
    (acc: number, item: any) => acc + item.totalPrice,
    0
  );
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert(
        "Your cart is empty. Please add items to your cart before checkout."
      );
      return;
    }

    if (!userEmail || !userAddress) {
      alert("Please fill in your email and address before checkout.");
      return;
    }
    dispatch(OrderPlace(cart, userEmail, userAddress,totalPrices));
    setOrderPlaced(true);
  };

  useEffect(() => {
    setTimeout(() => {
      if (orderPlaced) {
        localStorage.removeItem("cart");
        navigate("/");
      }
    }, 5000);
  }, [orderPlaced, navigate]);


  console.log(totalPrices);

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
              <TableCell>Price</TableCell>
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
                      style={{ marginRight: 16 }}
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
                  <Button variant="outlined" color="success">
                    {item.totalPrice}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="outlined" color="success" style={{margin:"15px"}}>
        Total Price : {totalPrices}
      </Button>
      <Box mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <TextField
              label="Email"
              variant="outlined"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              label="Address"
              variant="outlined"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        </Grid>
      </Box>
      <Box mt={2}></Box>

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
        <Box>
          <Button variant="outlined" onClick={() => navigate("/")}>
            Continue Shopping
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ShoppingCart;
