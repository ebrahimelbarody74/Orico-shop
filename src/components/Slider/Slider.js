import React, { useState } from "react";
import { sliderData } from "../../assets/data/dummyData.jsx";
import "./Slider.scss";
import {
  handelCircle,
  handelNext,
  handelPrev,
} from "../../rtk/slices/sliderSlice.js";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Slider() {
  const value = useSelector((state) => state.slider.count);
  const dispatch = useDispatch();
  return (
    <div className="slider">
      <button className="prev" onClick={() => dispatch(handelPrev(value - 1))}>
        <ArrowBackIcon />
      </button>
      <button className="next" onClick={() => dispatch(handelNext(value + 1))}>
        <ArrowForwardIcon />
      </button>
      {sliderData.map((img, index) => (
        <img
          src={img.img}
          className={index === value ? "opcity-1" : "opcity-0"}
        />
      ))}
      <div className="circle">
        {sliderData.map((s, index) => (
          <span
            className={index === value && "active"}
            onClick={() => dispatch(handelCircle(index))}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Slider;
