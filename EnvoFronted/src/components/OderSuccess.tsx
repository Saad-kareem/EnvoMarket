import { Container, Box, Typography, Button, Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { NavLink } from "react-router-dom";

const Success = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Paper
        elevation={3}
        sx={{ padding: "2rem", textAlign: "center", borderRadius: "10px" }}
      >
        <Box sx={{ position: "relative", display: "inline-block", mb: 2 }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: "#FFA500" }} />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "120px",
              height: "120px",
              backgroundColor: "rgba(255, 165, 0, 0.2)",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: -1,
            }}
          />
        </Box>
        <Typography variant="h5" gutterBottom>
          Thank you for ordering!
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <NavLink to="/orders">
            <Button variant="outlined" sx={{ mr: 1 }}>
              View Order
            </Button>
          </NavLink>
          <NavLink to="/">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FFA500",
                "&:hover": { backgroundColor: "#FF8C00" },
              }}
            >
              Continue Shopping
            </Button>
          </NavLink>
        </Box>
      </Paper>
    </Container>
  );
};

export default Success;
