import {
  Box,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { ShopCard, ShopData } from "../Sdata/ShopData";

const Shop = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        backgroundColor: "#f8ebeb",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "20%" },
          padding: 2,
          borderRight: { xs: "none", md: "1px solid #ccc" },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Home
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Clothes" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Accessories" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Art" />
          </ListItem>
        </List>
        <Divider />
        <Box>
          {ShopData.map((datas) => {
            return (
              <Grid>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  {datas.title}
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={datas.check1}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label={datas.check2}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label={datas.check3}
                  />
                </FormGroup>
              </Grid>
            );
          })}
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={3}>
          {ShopCard.map((items) => {
            return (
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ textAlign: "center" }}>
                  <img
                    src={items.img}
                    alt="Clothes"
                    style={{ width: "100%" }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {items.title}
                  </Typography>
                  <Typography variant="body2">{items.desc}</Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Shop;
