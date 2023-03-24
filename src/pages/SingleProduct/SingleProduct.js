import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./SingleProduct.scss";
import Navbar from "../../components/Navbar/Navbar";
import { addToCart } from "../../rtk/slices/cartSlice";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import Swal from "sweetalert2";
import swal from "sweetalert";

function SingleProduct() {
  const paramsId = useParams().id;
  console.log(paramsId);
  const singleProduct = useSelector((state) => state.products.singleProduct);
  const dispatch = useDispatch();

  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const navigate = useNavigate();
  return (
    <div className="singleProduct">
      <Navbar />
      <ScrollToTop />
      {singleProduct.map((e) => (
        <div className="product-row">
          <div className="img">
            <img src={e.img} />
          </div>
          <div className="right">
            <div className="info">
              <h3>{e.name}</h3>
              <p>{e.text}</p>
              {e.size && (
                <>
                  <h5>Pick a Size</h5>
                  <select onChange={(e) => setSize(e.target.value)}>
                    {e.size.map((s) => (
                      <option>{s}</option>
                    ))}
                  </select>
                </>
              )}
              <h5>Pick a Color</h5>
              <select onChange={(e) => setColor(e.target.value)}>
                {e.color.map((c) => (
                  <option>{c}</option>
                ))}
              </select>
              <button
                onClick={() =>
                  color !== "" && size !== ""
                    ? dispatch(
                        addToCart({
                          id: e.id,
                          name: e.name,
                          price: e.price,
                          text: e.text,
                          img: e.img,
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
                          navigate("/cart");
                        }
                      })
                    : swal({
                        title: "please chosse color and size",
                        icon: "warning",
                        dangerMode: true,
                      })
                }
              >
                ADD To CART
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SingleProduct;
