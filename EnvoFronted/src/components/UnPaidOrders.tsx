// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUnPaidOrders } from "../service/action/action";
// import {
//   Card,
//   CardContent,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Container,
//   Button,
// } from "@mui/material";
// import { loadStripe } from "@stripe/stripe-js";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";

// const stripePromise = loadStripe(
//   "pk_test_51Nv06bHv7FnHz0YWZv4xGwu88nT00IMNhKikYWChBFGEEVK88FUjhJfa5ysEGmWKLBmCR3d6o3CrdDKalmUB4bLD00atH2xhnm"
// );

// const UnPaidOrders = () => {
//   const dispatch = useDispatch();
//   const unpaidOrders = useSelector(
//     (state: any) => state.UnPaidOrders.UnpaidOrders
//   );

//   const [userInfo, setUserInfo] = useState({ email: "" });

//   const userEmail = userInfo.email;

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setUserInfo(jwtDecode(token));
//     }
//   }, []);

//   useEffect(() => {
//     dispatch(fetchUnPaidOrders());
//   }, [dispatch]);

//   const userUnpaidOrders = unpaidOrders.filter(
//     (order: any) => order.userEmail === userEmail
//   );

//   const handlePayment = async () => {
//     try {
//       const cartItems = userUnpaidOrders
//         .map((order: any) => {
//           return order.items
//             .map((item: any) => {
//               const price = parseFloat(item.price);
//               const quantity = parseInt(item.quantity, 10);
//               const totalPrice = price * quantity; // Ensure totalPrice calculation is correct

//               // Check for valid number values
//               if (isNaN(price) || isNaN(quantity) || isNaN(totalPrice)) {
//                 console.error(
//                   `Invalid item data: price=${item.price}, quantity=${item.quantity}, totalPrice=${totalPrice}`
//                 );
//                 return null; // Skip invalid items
//               }

//               return {
//                 name: item.name,
//                 price: price,
//                 quantity: quantity,
//                 totalPrice: totalPrice, // Ensure totalPrice is included
//               };
//             })
//             .filter((item) => item !== null); // Remove invalid items
//         })
//         .flat();

//       const { data } = await axios.post(
//         "http://localhost:3000/stripe/create-checkout-session",
//         {
//           cartItems: cartItems,
//           email: userEmail,
//         }
//       );

//       const stripe = await stripePromise;

//       if (!stripe) {
//         console.error("Stripe has not loaded correctly.");
//         return;
//       }

//       const result = await stripe.redirectToCheckout({
//         sessionId: data.id,
//       });

//       if (result.error) {
//         console.error(result.error.message);
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error(
//           "Error creating Stripe Checkout session:",
//           error.response?.data
//         );
//       } else {
//         console.error("Unexpected error:", error);
//       }
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Unpaid Orders
//       </Typography>
//       {userUnpaidOrders.length === 0 ? (
//         <Typography variant="h6" component="p">
//           You have no unpaid orders.
//         </Typography>
//       ) : (
//         userUnpaidOrders.map((order: any) => (
//           <Card key={order.id} variant="outlined" sx={{ marginBottom: 2 }}>
//             <CardContent>
//               <Typography variant="h6" component="h2">
//                 Order ID: {order.id} - Status: {order.status}
//               </Typography>
//               <List>
//                 {order.items.map((item: any) => (
//                   <ListItem key={item.id}>
//                     <ListItemText
//                       primary={`${item.name} - ${item.price}`}
//                       secondary={
//                         <>
//                           <Typography component="span" variant="body2">
//                             Quantity: {item.quantity}
//                           </Typography>
//                           <br />
//                           <Typography component="span" variant="body2">
//                             Total Price: {item.quantity * item.price}
//                           </Typography>
//                         </>
//                       }
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </CardContent>
//           </Card>
//         ))
//       )}
//       <Button
//         variant="contained"
//         sx={{
//           backgroundColor: "#FFA500",
//           "&:hover": { backgroundColor: "#FF8C00" },
//         }}
//         onClick={handlePayment}
//       >
//         Pay
//       </Button>
//     </Container>
//   );
// };

// export default UnPaidOrders;
