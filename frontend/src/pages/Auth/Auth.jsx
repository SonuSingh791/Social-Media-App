import React, {useState} from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import {useDispatch, useSelector} from 'react-redux';
import { logIn, signUp } from "../../Actions/authAction"; // Auth.js -> ./../Actions/authAction -> '../Api/authRequest';

const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  console.log(loading)
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [data, setData] = useState({firstName: "", lastName: "", password: "", confirmpass: "", username: ""});
  const [confirmPass, setConfirmPass] = useState(true);
  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignedUp) {
      dispatch(logIn(data)); // it will send data to '{ logIn } from "../../Actions/authAction"';
    }
    else {
      if(data.confirmpass === data.password) {
        dispatch(signUp(data));   // it will send data to '{ signUp } from "../../Actions/authAction"';
      }
      else {
        setConfirmPass(false);
        setTimeout(() => {
          setConfirmPass(true);
        }, 2000);
      }
    }
  }

  const resetForm = (e) => {
    setConfirmPass(true);
    setData({firstName: "", lastName: "", password: "", confirmpass: "", username: ""});
  }

  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>ZKC Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {/* Right Side */}
      <div className="a-right">
      <form className="infoForm authForm" onSubmit = {handleSubmit}>
        <h3>{!isSignedUp ? "Sign Up" : "Login"}</h3>
        {!isSignedUp && 
          <div>
            <input
              type="text"
              placeholder="First Name"
              className="infoInput"
              name="firstName"
              onChange = {handleChange}
              value = {data.firstName}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="infoInput"
              name="lastName"
              onChange = {handleChange}
              value = {data.lastName}
            />
          </div>
        
        }

        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="Usernames"
            onChange = {handleChange}
            value = {data.username}
          />
        </div>

        <div>
          <input
            type="password"
            className="infoInput"
            name="password"
            placeholder="Password"
            onChange = {handleChange}
            value = {data.password}
          />
          {!isSignedUp && 
            <input
              type="password"
              className="infoInput"
              name="confirmpass"
              placeholder="Confirm Password"
              onChange = {handleChange}
              value = {data.confirmpass}
            />
          }
        </div>
          <span style = {{display: confirmPass ? "none" : "block", color: 'red', alignSelf: "flex-end", marginRight: "5px", fontSize: "12px"}}>* Confirm Password is not same</span>
        <div>
            <span style={{fontSize: '12px', cursor: "pointer"}} onClick = {() => {setIsSignedUp((prev) => !prev); resetForm()}}>{!isSignedUp ? "Already have an account. Login!" : "Don't have an account. Signup!"}  </span>
        </div>
        <button className="button infoButton" type="submit" disabled = {loading}>{loading ? "Loading..." : isSignedUp ? "login" : "signup"} </button>
      </form>
    </div>
    </div>
  );
};


export default Auth;