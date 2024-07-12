// src/PostManagement.js
import { Card, CardContent, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const PostManagement = () => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          Post Management
        </Typography>
        <Typography variant="body2">Manage your posts here.</Typography>
        <Typography variant="body2" style={{ marginTop: "15px" }}>
          <NavLink to="/addProduct">Add Product </NavLink>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostManagement;
