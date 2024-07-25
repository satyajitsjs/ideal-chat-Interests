import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Components/Headers/Header";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitEvent = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success("Login successful!");
      navigate("/user");
    } catch (error) {
      console.error("There was an error logging in:", error);
      toast.error("Login failed. Please check your username and password.");
    }
  };

  return (
    <>
      <Header />
      <div className="container text-center">
        <div className="mt-3">
          <TextField
            id="username"
            type="text"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <TextField
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <Button variant="contained" onClick={submitEvent}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
}
