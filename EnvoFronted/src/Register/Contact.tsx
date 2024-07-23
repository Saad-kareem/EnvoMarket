import { Box, Grid, Paper, Typography, TextField, Button } from "@mui/material";
import { LocationOn, Phone, Email, Public } from "@mui/icons-material";
import { useState } from "react";
import { connect } from "react-redux";
import { postContact } from "../service/action/action";
const ContactForm = ({ messagePost }: any) => {
  const [FullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [Message, setMessage] = useState("");
  const [Subject, setSubject] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await messagePost({ FullName, email, Message, Subject });
    setTimeout(() => {
      setFullName("");
      setEmail("");
      setMessage("");
      setSubject("");
    }, 3000);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 900,
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            // bgcolor: "#4caf50",
            background: "linear-gradient(to right, #8e2de2, #4a00e0)",
            color: "white",
            p: 3,
            width: "40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Let's get in touch
          </Typography>
          <Typography variant="body1" paragraph>
            We're open for any suggestion or just to have a chat
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <LocationOn sx={{ mr: 1 }} />
            <Typography variant="body2">
              Khired Networks DHA Phase 6{" "}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Phone sx={{ mr: 1 }} />
            <Typography variant="body2">+923496581580</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Email sx={{ mr: 1 }} />
            <Typography variant="body2">saadkareem2481@gmail.com</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Public sx={{ mr: 1 }} />
            <Typography variant="body2">www.sportus.com</Typography>
          </Box>
        </Box>
        <Box sx={{ p: 3, width: "60%" }}>
          <Typography variant="h6" gutterBottom>
            Get in touch
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Full Name"
                variant="outlined"
                value={FullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email Address"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Subject"
                variant="outlined"
                value={Subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Message"
                multiline
                rows={4}
                variant="outlined"
                value={Message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Send Message
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  data: state.message.message,
});

const mapDispatchToProps = (dispatch: any) => ({
  messagePost: (data: any) => dispatch(postContact(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
