
import React from "react";
import "./Discount.scss";
import Ddata from "../../assets/data/dummyData";
import Slider from "react-slick";

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

const Discount = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <NextArrow></NextArrow>,
    prevArrow: <PrevArrow></PrevArrow>,
    responsive: [
      {
        breackpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,

          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="discount">
      <div className="container">
        <div className="head">
          <h1>Big Discounts</h1>
        </div>
        <Slider {...settings}>
          {Ddata.map((e) => (
            <div className="box">
              <div className="col">
                <div className="img">
                  <img src={e.cover} alt="" />
                </div>
                <h3>{e.name}</h3>
                <span>{e.price}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Discount;
