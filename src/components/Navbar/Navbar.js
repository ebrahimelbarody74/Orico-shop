import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, NavLink } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { darkMode } from "../../rtk/slices/sliderSlice";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { removeProduct } from "../../rtk/slices/cartSlice";
import { productType } from "../../assets/data/dummyData.jsx";
import { filterProduct } from "../../rtk/slices/productSlice";

window.onscroll = () => {
  console.log(document.documentElement.scrollTop);
  if (document.documentElement.scrollTop > 30) {
    document.querySelector(".whole-cart-window").style.top = `0% `;
  } else {
    document.querySelector(".whole-cart-window").style.top = "7% ";
  }
};
function Navbar() {
  const isAdman = JSON.parse(localStorage.getItem("isAdman"));
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);
  const dark = useSelector((state) => state.slider.dark);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const [close, setClose] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const [openDepartments, setOpenDepartments] = useState(false);

  const [t, i18n] = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(JSON.parse(localStorage.getItem("lang")));
    JSON.parse(localStorage.getItem("lang")) == "ar"
      ? document.getElementsByTagName("html")[0].setAttribute("dir", "rtl")
      : document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
  }, []);

  return (
    <div className="navbar">
      <div className="container">
        <div className="left">
          <h1>{t("title")}</h1>
        </div>
        <div className={`mid ${active && "active"}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products/1">Products</NavLink>
            </li>
            <li onClick={() => setOpenDepartments(!openDepartments)}>
              Departments
              {openDepartments && (
                <ul className="departments">
                  {productType.map((e) => (
                    <li>
                      <Link
                        to={`/filterProduct/${e.type}`}
                        onClick={() => dispatch(filterProduct(e.type))}
                      >
                        {e.type}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="right">
          <ul>
            <li>
              {dark ? (
                <LightModeOutlinedIcon
                  onClick={() => dispatch(darkMode("light"))}
                />
              ) : (
                <DarkModeIcon onClick={() => dispatch(darkMode("dark"))} />
              )}
            </li>
            <li>
              <LanguageOutlinedIcon onClick={() => setOpenLang(!openLang)} />
              {openLang && (
                <div className="lang">
                  <ul>
                    <li
                      onClick={() => {
                        document
                          .getElementsByTagName("html")[0]
                          .setAttribute("dir", "ltr");
                        i18n.changeLanguage("en");
                        localStorage.setItem(
                          "lang",
                          JSON.stringify(i18n.language)
                        );
                        setOpenLang(!openLang);
                      }}
                    >
                      EN
                    </li>
                    <li
                      onClick={() => {
                        document
                          .getElementsByTagName("html")[0]
                          .setAttribute("dir", "rtl");
                        i18n.changeLanguage("ar");
                        localStorage.setItem(
                          "lang",
                          JSON.stringify(i18n.language)
                        );
                        setOpenLang(!openLang);
                      }}
                    >
                      AR
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <ShoppingCartOutlinedIcon onClick={() => setClose(!close)} />
              {close && (
                <div class="whole-cart-window">
                  <div class="cart-wrapper">
                    <div class="cart-item">
                      <div className="close">
                        <span onClick={() => setClose(false)}>&times;</span>
                      </div>
                      {cart.map((e) => (
                        <>
                          <div className="cart-box">
                            <div className="left">
                              <img src={e.img} />
                              <h3>{e.name}</h3>
                              <p>{e.text}</p>
                            </div>
                            <div className="right">
                              <ul>
                                <li>Selected Size : {e.size}</li>
                                <li>Selected Color : {e.color}</li>
                                <li>Amount : {e.count}</li>
                                <li>Single Item Peice : {e.price}</li>
                                <li>Total Item Peice : {e.totalPrice}</li>
                                <button
                                  onClick={() => dispatch(removeProduct(e))}
                                >
                                  Delete
                                </button>
                              </ul>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                  <Link to="/cart">
                    <button>Go to cart</button>
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link to={!isAdman && "/login"} onClick={() => setShow(!show)}>
                <PersonIcon />
              </Link>
              {isAdman && show && (
                <div className="list">
                  <ul>
                    <li>Profile</li>
                    <li>Orders</li>
                    <li>
                      <Link
                        to="/login"
                        onClick={() =>
                          localStorage.setItem("isAdman", JSON.stringify(false))
                        }
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="menu">
              <MenuIcon onClick={() => setActive(!active)} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
