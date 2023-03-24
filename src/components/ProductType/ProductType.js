import React from "react";
import Slider from "react-slick";
import { productType } from "../../assets/data/dummyData.jsx";
import "./ProductType.scss";
import Link, { NavLink } from "react-router-dom";
import { filterProduct } from "../../rtk/slices/productSlice.js";
import { useDispatch } from "react-redux";
import Zoom from "react-reveal/Zoom";
import { useTranslation } from "react-i18next";

const NextArrow = (props) => {
  const { onClick } = props;

  return (
    <div className="btn" onClick={onClick}>
      <button className="Next">+</button>
    </div>
  );
};
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="btn" onClick={onClick}>
      <button className="prev">-</button>
    </div>
  );
};

function ProductType() {
  const [t, i18n] = useTranslation();
  const dispatch = useDispatch();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <NextArrow></NextArrow>,
    prevArrow: <PrevArrow></PrevArrow>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="productType">
      <Zoom bottom cascade>
        <Slider {...settings}>
          {productType.map((e) =>
            JSON.parse(localStorage.getItem("lang")) =="ar" ? (
              <NavLink
                onClick={() => dispatch(filterProduct(e.type))}
                to={`/filterProduct/${e.type}`}
              >
                <div className="box">
                  <div className="col">
                    <div className="img">
                      <img src={e.img} alt="" />
                    </div>
                    <h3>{e.type_ar}</h3>
                  </div>
                </div>
              </NavLink>
            ) : (
              <NavLink
                onClick={() => dispatch(filterProduct(e.type))}
                to={`/filterProduct/${e.type}`}
              >
                <div className="box">
                  <div className="col">
                    <div className="img">
                      <img src={e.img} alt="" />
                    </div>
                    <h3>{e.type}</h3>
                  </div>
                </div>
              </NavLink>
            )
          )}
        </Slider>
      </Zoom>
    </div>
  );
}

export default ProductType;
