import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaidOrders } from "../service/action/action";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";

const PaidOrders = () => {
  const dispatch = useDispatch();
  const paidOrders = useSelector((state: any) => state.orders.paidOrders);
  const [userInfo, setUserInfo] = useState({ email: "" });

  const userEmail = userInfo.email;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserInfo(jwtDecode(token));
    }
  }, []); // Ensure this effect runs only once on component mount

  useEffect(() => {
    dispatch(fetchPaidOrders());
  }, [dispatch]);

  const userPaidOrders = paidOrders.filter(
    (order: any) => order.userEmail === userEmail
  );

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Paid Orders
      </Typography>
      {userPaidOrders.length === 0 ? (
        <Typography variant="h6" component="p">
          You have no orders.
        </Typography>
      ) : (
        userPaidOrders.map((order: any) => (
          <Card key={order.id} variant="outlined" sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Order ID: {order.id} - Status: {order.status}
              </Typography>
              <List>
                {order.items.map((item: any) => (
                  <ListItem key={item.id}>
                    <ListItemText
                      primary={`${item.name} - ${item.price}`}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            Quantity: {item.quantity}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            Total Price: {item.quantity * item.price}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default PaidOrders;
