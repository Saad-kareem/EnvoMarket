// import { useState, useEffect } from "react";
// import { TextField, Button, Grid, Container, Typography } from "@mui/material";
// import SaveIcon from "@mui/icons-material/Save";
// import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../service/action/action";
// import { connect } from "react-redux";
// import { jwtDecode } from "jwt-decode";
// const Login = ({ UserLogin }: any) => {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState({ role: "" });
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         setUserData(decodedToken);
//       } catch (error) {
//         console.error("Error decoding token:", error);
//       }
//     }
//   }, []);

//   console.log(userData);

//   const handleChange = (e: any) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     UserLogin(formData);

//     // Delayed navigation based on user role after login
//     setTimeout(() => {
//       // Check the role from userData after UserLogin dispatch
//       if (userData.role === "Admin") {
//         navigate("/adminPanel");
//       } else {
//         navigate("/");
//       }
//     }, 5500); // Adjust delay time as needed
//   };
//   return (
//     <>
//       <Container maxWidth="sm" style={{ marginTop: "10%" }}>
//         <Typography variant="h4" component="h1" gutterBottom mt={10}>
//           User Login
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 name="email"
//                 label="Email"
//                 type="email"
//                 variant="outlined"
//                 fullWidth
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 name="password"
//                 label="Password"
//                 type="password"
//                 variant="outlined"
//                 fullWidth
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <span
//               style={{ fontSize: "12px", marginLeft: "20px", marginTop: "7px" }}
//             >
//               If you don't have and an acount
//               <NavLink
//                 to="/register"
//                 style={{
//                   fontSize: "13px",
//                   marginLeft: "10px",
//                   marginTop: "7px",
//                 }}
//               >
//                 Go to Register
//               </NavLink>
//             </span>
//             <Grid item xs={12}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 startIcon={<SaveIcon />}
//                 fullWidth
//               >
//                 Sign In
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Container>
//     </>
//   );
// };

// const mapStateToProps = (state: any) => ({
//   data: state.data,
// });

// const mapDispatchToProps = (dispatch: any) => ({
//   UserLogin: (data: any) => dispatch(loginUser(data)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
import { useState, useEffect } from "react";
import { TextField, Button, Grid, Container, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../service/action/action";
import { connect } from "react-redux";
import { jwtDecode } from "jwt-decode"; // corrected import

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
        const decodedToken = jwtDecode(token);
        setUserData(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []); // Dependency array should be empty to run once on mount

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

      // Directly check user role after login
      setTimeout(() => {
        if (userData.role === "Admin") {
          navigate("/adminPanel");
        } else {
          navigate("/");
        }
      }, 5500); // Adjust delay time as needed
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <Container maxWidth="sm" style={{ marginTop: "10%" }}>
        <Typography variant="h4" component="h1" gutterBottom mt={10}>
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
            <span
              style={{ fontSize: "12px", marginLeft: "20px", marginTop: "7px" }}
            >
              If you don't have an account
              <NavLink
                to="/register"
                style={{
                  fontSize: "13px",
                  marginLeft: "10px",
                  marginTop: "7px",
                }}
              >
                Go to Register
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
                Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  data: state.data,
});

const mapDispatchToProps = (dispatch: any) => ({
  UserLogin: (data: any) => dispatch(loginUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
