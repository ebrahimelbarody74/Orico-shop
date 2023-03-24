import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import img from "../../assets/images/register/karsten-winegeart-4bC1Ef88OYI-unsplash.jpg";
import "./Register.scss";
import { useDispatch } from "react-redux";
import { register } from "../../rtk/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  const dispatch = useDispatch();
  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(fname, lname, email, password);
    // dispatch(register({fname,lname,email,password}));
    fetch("/api/userdb", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ fname, lname, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          if (data.status === "true") {
            navigator("/");
            localStorage.setItem("isAdman", JSON.stringify(true));
          }
        }
      });
  };
  return (
    <div className="register">
      <Navbar />
      <div className="row">
        <div className="left">
          <form onSubmit={handelSubmit}>
            <label for="fname">Frist Name</label>
            <input
              type="text"
              placeholder="Frist Name"
              name="fname"
              id="fname"
              onChange={(e) => setFname(e.target.value)}
            />
            <label for="lname">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              name="lname"
              id="lname"
              onChange={(e) => setLname(e.target.value)}
            />
            <label for="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label for="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/login">Already Registered?</Link>
            <button>Sign In</button>
          </form>
        </div>
        <div className="right">
          <img src={img} />
        </div>
      </div>
    </div>
  );
}

export default Register;
