import { useState } from "react";
import { TextField, Button, Grid, Container, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchData } from "../service/action/action";
import { connect } from "react-redux";

const SignUp = ({ addUserData }: any) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    addUserData(formData);
    setTimeout(() => {
      navigate("/user/login");
    }, 5200);
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom mt={10}>
        User Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="firstName"
              label="First Name"
              variant="outlined"
              fullWidth
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="lastName"
              label="Last Name"
              variant="outlined"
              fullWidth
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Grid>
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
          <span
            style={{ fontSize: "12px", marginLeft: "20px", marginTop: "7px" }}
          >
            If you have already an acount
            <NavLink
              to="/user/login"
              style={{ fontSize: "13px", marginLeft: "10px", marginTop: "7px" }}
            >
              Go to Login
            </NavLink>
          </span>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              fullWidth
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  data: state.data, // Assuming your reducer sets `inputData` in the state
});

const mapDispatchToProps = (dispatch: any) => ({
  addUserData: (data: any) => dispatch(fetchData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
