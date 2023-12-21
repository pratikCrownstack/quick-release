"use client";
import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  function handleInput(e: any) {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", userInfo);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }
  console.log({ userInfo });
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" onChange={handleInput} />
      <input type="password" name="password" onChange={handleInput} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Register;
