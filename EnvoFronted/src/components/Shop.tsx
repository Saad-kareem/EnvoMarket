import { NavLink } from "react-router-dom";
import { ShopCard, ShopData } from "../Sdata/ShopData";

const Shop = () => {
  return (
    <div className="Shop">
      <div className="container-fluid">
        <div className="Shops-Type">
          <div className="row">
            <div className="Shop-left">
              <div className="Shop-Category">
                <div className="Home-Shops">
                  <h2>Home</h2>
                  <ul className="Shops-links">
                    <li>
                      <NavLink className="links" to="/">
                        Clothes
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/">Accessories</NavLink>
                    </li>
                    <li>
                      <NavLink to="/">Art</NavLink>
                    </li>
                  </ul>
                </div>
                <div className="borerline"></div>
                <div className="filterData">
                  {ShopData.map((data, index) => {
                    return (
                      <div className="Shop-filter" key={index}>
                        <h2>{data.title}</h2>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" />
                          <label className="form-check-label">
                            {data.check1}
                          </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" />
                          <label className="form-check-label">
                            {data.check2}
                          </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" />
                          <label className="form-check-label">
                            {data.check3}
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {ShopCard.map((item) => {
              return (
                <div className="col-md-3 shop-right ">
                  <div className="Card">
                    <div className="card-image">
                      <NavLink to="/">
                        <img src={item.img} />
                      </NavLink>
                    </div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
