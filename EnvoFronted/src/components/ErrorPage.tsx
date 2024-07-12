import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <Box>
        <Typography variant="h1" color="error">
          404
        </Typography>
        <Typography variant="h5" color="textSecondary">
          Page Not Found
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          style={{ margin: "20px 0" }}
        >
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/">
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
