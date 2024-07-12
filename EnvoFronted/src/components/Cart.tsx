// import {
//   Container,
//   Typography,
//   Breadcrumbs,
//   Grid,
//   Button,
//   IconButton,
//   Divider,
// } from "@mui/material";
// import ShareIcon from "@mui/icons-material/Share";
// import {
//   FacebookShareButton,
//   WhatsappShareButton,
//   LinkedinShareButton,
//   InstapaperShareButton,
// } from "react-share";
// import {
//   FavoriteBorder as FavoriteBorderIcon,
//   ShoppingCart as ShoppingCartIcon,
//   Autorenew as AutorenewIcon,
//   WhatsApp,
//   Facebook,
//   Instagram,
//   LinkedIn,
// } from "@mui/icons-material";
// //import image1 from "../assets/perfume1.jpeg";
// import { NavLink } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { connect } from "react-redux";
// import { addToCart } from "../service/action/action";

// const Cart = ({ addToCart }: any) => {
//   const { id } = useParams();
//   const [singleProduct, setSingleProduct] = useState();
//   const [share, setShare] = useState(false);

//   const fetchProducts = async () => {
//     await axios
//       .get(`http://localhost:3000/product/findOne/${id}`)
//       .then((resp) => {
//         setSingleProduct(resp.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   const handleAddToCart = () => {
//     if (singleProduct) {
//       addToCart(singleProduct);
//     }
//   };
//   useEffect(() => {
//     fetchProducts();
//   }, [id]);
//   if (!singleProduct) return <p>Loading...</p>;

//   return (
//     <Container>
//       <Breadcrumbs aria-label="breadcrumb" sx={{ margin: "20px 0" }}>
//         <NavLink color="inherit" to="/">
//           Home
//         </NavLink>
//         <NavLink color="inherit" to="/">
//           Clothes
//         </NavLink>
//         <NavLink color="inherit" to="/">
//           Women
//         </NavLink>
//       </Breadcrumbs>
//       <Grid container spacing={4} style={{ marginTop: "30px" }}>
//         <Grid item xs={12} md={6}>
//           <img
//             src={singleProduct.imagePath}
//             alt="Product"
//             style={{ width: "100%", height: "70%" }}
//           />
//         </Grid>
//         <Grid item xs={12} md={6} style={{ marginTop: "60px" }}>
//           <Typography variant="h4">{singleProduct.name}</Typography>
//           <div>
//             <IconButton color="primary" onClick={() => setShare(!share)}>
//               <ShareIcon />
//             </IconButton>
//             <IconButton color="primary">
//               <FavoriteBorderIcon />
//             </IconButton>
//           </div>
//           {share && (
//             <div style={{ backgroundColor: "#fff", marginLeft: "5px" }}>
//               <IconButton>
//                 <WhatsappShareButton url={`http://localhost:5173/cart/${id}`}>
//                   <WhatsApp />
//                 </WhatsappShareButton>
//               </IconButton>
//               <IconButton>
//                 <FacebookShareButton url={`http://localhost:5173/cart/${id}`}>
//                   <Facebook />
//                 </FacebookShareButton>
//               </IconButton>
//               <IconButton>
//                 <InstapaperShareButton url={`http://localhost:5173/cart/${id}`}>
//                   <Instagram />
//                 </InstapaperShareButton>
//               </IconButton>
//               <IconButton>
//                 <LinkedinShareButton url={`http://localhost:5173/cart/${id}`}>
//                   <LinkedIn />
//                 </LinkedinShareButton>
//               </IconButton>
//             </div>
//           )}
//           <Typography variant="h4" color="primary">
//             Pkr:{singleProduct.price}
//           </Typography>
//           <Typography variant="body1" sx={{ margin: "20px 0" }}>
//             {singleProduct.description}
//           </Typography>
//           <Divider sx={{ margin: "20px 0" }} />

//           <div
//             style={{ display: "flex", alignItems: "center", margin: "20px 0" }}
//           >
//             <Button
//               variant="contained"
//               color="primary"
//               startIcon={<ShoppingCartIcon />}
//               onClick={handleAddToCart}
//             >
//               ADD TO CART
//             </Button>
//             <IconButton color="primary">
//               <FavoriteBorderIcon />
//             </IconButton>
//             <IconButton color="primary">
//               <AutorenewIcon />
//             </IconButton>
//           </div>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default connect(null, { addToCart })(Cart);

import {
  Container,
  Breadcrumbs,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  InstapaperShareButton,
} from "react-share";
import { WhatsApp, Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { addToCart, getSingalProduct } from "../service/action/action";
import { toast } from "react-toastify";

const Cart = ({ getSingalProduct, data }: any) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [share, setShare] = useState(false);

  const handleAddToCart = () => {
    if (data) {
      dispatch(addToCart(data));
      toast.success("Product Successfully Added");
    }
  };
  useEffect(() => {
    getSingalProduct(id);
  }, [id]);

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" sx={{ margin: "20px 0" }}>
        <NavLink color="inherit" to="/">
          Home
        </NavLink>
        <NavLink color="inherit" to="/">
          Clothes
        </NavLink>
        <NavLink color="inherit" to="/">
          Women
        </NavLink>
      </Breadcrumbs>
      <Grid container spacing={4} style={{ marginTop: "30px" }}>
        <Grid item xs={12} md={6}>
          <img
            src={data.imagePath}
            alt="Product"
            style={{ width: "100%", height: "70%" }}
          />
        </Grid>
        <Grid item xs={12} md={6} style={{ marginTop: "60px" }}>
          <Typography variant="h4">{data.name}</Typography>
          <div>
            <IconButton color="primary" onClick={() => setShare(!share)}>
              <ShareIcon />
            </IconButton>
            <IconButton color="primary">
              <FavoriteBorderIcon />
            </IconButton>
          </div>
          {share && (
            <div style={{ backgroundColor: "#fff", marginLeft: "5px" }}>
              <IconButton>
                <WhatsappShareButton url={`http://localhost:5173/cart/${id}`}>
                  <WhatsApp />
                </WhatsappShareButton>
              </IconButton>
              <IconButton>
                <FacebookShareButton url={`http://localhost:5173/cart/${id}`}>
                  <Facebook />
                </FacebookShareButton>
              </IconButton>
              <IconButton>
                <InstapaperShareButton url={`http://localhost:5173/cart/${id}`}>
                  <Instagram />
                </InstapaperShareButton>
              </IconButton>
              <IconButton>
                <LinkedinShareButton url={`http://localhost:5173/cart/${id}`}>
                  <LinkedIn />
                </LinkedinShareButton>
              </IconButton>
            </div>
          )}
          <Typography variant="h4" color="primary">
            Pkr:{data.price}
          </Typography>
          <Typography variant="body1" sx={{ margin: "20px 0" }}>
            {data.description}
          </Typography>
          <Divider sx={{ margin: "20px 0" }} />
          <div
            style={{ display: "flex", alignItems: "center", margin: "20px 0" }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
            >
              ADD TO CART
            </Button>
            <IconButton color="primary">
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton color="primary">
              <AutorenewIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  data: state.singalData.data,
});

const mapDispatchToProps = {
  getSingalProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
