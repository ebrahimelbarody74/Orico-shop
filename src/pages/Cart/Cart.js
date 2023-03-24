import React, { useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
// import { decrease, increase, removeProduct } from '../../rtk/Slices/Product-slice'
import { json } from "react-router-dom";
import "./Cart.scss";
import Bounce from "react-reveal/Bounce";
import { decrese, increse, removeProduct } from "../../rtk/slices/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  console.log(totalPrice);

  return (
    <>
      <Navbar />
      <div className="cart">
        <div className="container">
          <div className="row">
            <div className="left">
              {cart.map((e) => (
                <Bounce left cascade>
                  <div className="box">
                    <div className="product">
                      <div className="img">
                        <img src={e.img} alt="" />
                      </div>
                      <div className="text">
                        <h5>{e.name}</h5>
                        <div className="bottom">
                          <div className="count">
                            {e.price}*{e.count}
                          </div>
                          <div className="price">{e.totalPrice} $</div>
                        </div>
                      </div>
                      <div className="action">
                        <div
                          className="del"
                          onClick={()=>dispatch(removeProduct(e))}
                        >
                          X
                        </div>
                        <div className="bottom">
                          <div
                            className="increase"
                             onClick={()=>dispatch(increse(e))}
                          >
                            +
                          </div>
                          <span>{e.count}</span>
                          <div
                            className="dec"
                             onClick={()=>dispatch(decrese(e))}
                          >
                            -
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Bounce>
              ))}
            </div>
            <div className="right">
              <div className="summary">
                <h3>Cart Summary</h3>
                <div className="price">
                  Total Price:
                  <span>{totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
