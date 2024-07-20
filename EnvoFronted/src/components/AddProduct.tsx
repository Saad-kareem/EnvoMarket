import { useState, useEffect } from "react";
import { Button, TextField, Typography, Container, Grid } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { connect } from "react-redux";
import { productAdd } from "../service/action/action";
import NotFound from "./ErrorPage";

const AddProduct = ({ ProductData }: any) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [userInfo, setUserInfo] = useState({ role: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setUserInfo(jwtDecode(token));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []); // Only run once on component mount

  const handleFileChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    if (image) {
      formData.append("image", image);
    } else {
      // Handle the case where image is null if needed
      console.warn("Image is null, not appending to FormData.");
    }
    ProductData(formData);
  };

  return (
    <>
      {userInfo.role === "Admin" ? (
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            Add Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Price"
                  type="number"
                  fullWidth
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <input type="file" onChange={handleFileChange} />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Add Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      ) : (
        <NotFound />
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  data: state.data,
});

const mapDispatchToProps = (dispatch: any) => ({
  ProductData: (data: any) => dispatch(productAdd(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
