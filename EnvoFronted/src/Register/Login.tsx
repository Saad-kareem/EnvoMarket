import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Box,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../service/action/action";
import { connect } from "react-redux";
import { jwtDecode } from "jwt-decode";

const Login = ({ UserLogin }: any) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ role: "" });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setUserData(jwtDecode(token));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await UserLogin(formData);

      setTimeout(() => {
        if (userData.role !== "Admin") {
          navigate("/");
        } else {
          navigate("/adminPanel");
        }
      }, 5500);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
     
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            textAlign="center"
          >
            User Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Typography variant="body2">
                  If you don't have an account
                  <NavLink to="/register" style={{ marginLeft: "5px" }}>
                    Go to Register
                  </NavLink>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  fullWidth
                  sx={{
                    background: "linear-gradient(to right, #6a11cb, #2575fc)",
                    color: "white",
                    padding: "0.75rem",
                    marginTop: "1rem",
                  }}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  data: state.data,
});

const mapDispatchToProps = (dispatch: any) => ({
  UserLogin: (data: any) => dispatch(loginUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
