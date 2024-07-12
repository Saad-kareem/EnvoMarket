import { Container, Typography, Grid } from "@mui/material";
import PostManagement from "./PostManagement";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import NotFound from "./ErrorPage";

const AdminPage = () => {
  const [userInfo, setUserInfo] = useState({ role: "" });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserInfo(jwtDecode(token));
    }
  });
  return (
    <>
      {userInfo.role === "Admin" ? (
        <Container style={{ marginTop: "50px" }}>
          <Typography variant="h3" gutterBottom>
            Admin Dashboard
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Posts
              </Typography>
              <PostManagement />
            </Grid>
          </Grid>
        </Container>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default AdminPage;
