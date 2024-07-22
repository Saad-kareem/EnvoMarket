import { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { productGet } from "../service/action/action";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Box,
} from "@mui/material";

const MyCard = ({ data, productGet }: any) => {
  useEffect(() => {
    productGet();
  }, [productGet]);

  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h2" sx={{ fontSize: 40, mb: 2 }}>
          FEATURE PRODUCTS
        </Typography>
        <Typography variant="body1">
          Visit our shop to see amazing products
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {data.map((product: any, index: any) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="260"
                  image={`http://localhost:3000/uploads/${product.imagePath}`}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5">
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontWeight: 800, mb: 1 }}
                  >
                    Price: {product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Button
                  variant="contained"
                  component={NavLink}
                  to={`/cart/${product.id}`}
                  sx={{ mt: 1 }}
                >
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  data: state.data.data,
});

const mapDispatchToProps = {
  productGet,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCard);
