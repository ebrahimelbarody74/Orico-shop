import React, { useState } from "react";
import { storeData } from "../../assets/data/dummyData";
// import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { singleProduct } from "../../rtk/slices/productSlice";
import "./ProductComp.scss";
// import { addToCart } from "../../rtk/slices/cartSlice";

import Bounce from "react-reveal/Bounce";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { addToCart } from "../../rtk/slices/cartSlice";

function ProductComp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  return (
    <div className="productComp">
      <div className="container">
        <Bounce left cascade>
          <div className="row">
            {storeData.slice(0, 8).map((p) => (
              <div className="box">
                <a href="#">
                  <img src={p.img} />
                </a>
                <h3>{p.name}</h3>
                <p>{p.text}</p>
                <div className="filter-info">
                  <div className="price">${p.price}</div>
                  <div className="color">
                    {p.color.map((c) => (
                      <a>
                        <span
                          onClick={() => setColor(c)}
                          style={{ backgroundColor: c }}
                        ></span>
                      </a>
                    ))}
                  </div>
                  <div className="size">
                    <select onChange={(e) => setSize(e.target.value)}>
                      {p.size.map((s) => (
                        <option>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() =>
                    color !== "" && size !== ""
                      ? dispatch(
                          addToCart({
                            id: p.id,
                            name: p.name,
                            price: p.price,
                            text: p.text,
                            img: p.img,
                            color,
                            size,
                          })
                        ) &&
                        swal({
                          title: "do you go to cart",
                          icon: "success",
                          buttons: true,
                          dangerMode: true,
                        }).then((willDelete) => {
                          if (willDelete) {
                            navigate("cart");
                          }
                        }) &&
                        setColor("") &&
                        setSize("")
                      : swal({
                          title: "please chosse color and size",
                          icon: "warning",
                          dangerMode: true,
                        })
                  }
                >
                  {" "}
                  ADD To CART
                </button>
              </div>
            ))}
          </div>
        </Bounce>
      </div>
    </div>
  );
}

export default ProductComp;
