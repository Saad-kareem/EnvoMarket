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
} from "@mui/material";
import image1 from "../assets/perfume1.jpeg";

const MyCard = ({ data, productGet }: any) => {
  useEffect(() => {
    productGet();
  }, [productGet]);
  return (
    <div>
      <div style={{ textAlign: "center", margin: "30px 0" }}>
        <h2 style={{ fontSize: "40px", marginBottom: "20px" }}>
          FEATURE PRODUCTS
        </h2>
        <p>Visit our shop to see amazing products</p>
      </div>
      <Grid container spacing={2} padding={10}>
        {data.map((product: any, index: any) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{ display: "flex", margin: "0 auto" }}
          >
            <Card
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="260"
                  image={image1}
                  alt="Product"
                />

                <CardContent sx={{ flex: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ margin: "10px 1px", fontWeight: "800" }}
                  >
                    Price: {product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
                <NavLink
                  style={{ margin: "20px 10px", fontSize: "14px" }}
                  to={`/cart/${product.id}`}
                >
                  Detail
                </NavLink>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  data: state.data.data,
});

const mapDispatchToProps = {
  productGet,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCard);
