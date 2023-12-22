"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

const Login = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  function handleInput(e: any) {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: userInfo.email,
        password: userInfo.password,
        redirect: false,
      });
      if (res?.error) {
        console.log("error", res.error);
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" onChange={handleInput} />
      <input type="password" name="password" onChange={handleInput} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
