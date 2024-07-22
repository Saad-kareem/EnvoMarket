import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Box,
  Avatar,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { connect } from "react-redux";
import { productAdd } from "../service/action/action";
import NotFound from "./ErrorPage";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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
  }, []);

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
      console.warn("Image is null, not appending to FormData.");
    }
    setTimeout(() => {
      ProductData(formData);
      setName("");
      setPrice("");
      setDescription("");
      setImage(null);
    }, 3000);
  };

  return (
    <>
      {userInfo.role === "Admin" ? (
        <Container component="main" maxWidth="xs">
          <Paper
            elevation={6}
            sx={{
              mt: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 3,
              borderRadius: 2,
              background: "linear-gradient(to right, #8e2de2, #4a00e0)",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="white">
              Add Product
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="description"
                label="Description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="price"
                label="Price"
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="image"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="image">
                <Button
                  variant="contained"
                  component="span"
                  fullWidth
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "white",
                    color: "#4a00e0",
                    "&:hover": {
                      backgroundColor: "#f2f2f2",
                    },
                  }}
                >
                  Upload Image
                </Button>
              </label>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Product
              </Button>
            </Box>
          </Paper>
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
