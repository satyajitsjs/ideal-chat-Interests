import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../Components/Headers/Header";
import 'react-toastify/dist/ReactToastify.css';
import ApiURL from "../Components/BaseURL/ApiURL";

export default function Register() {
  // State hooks to manage input values
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate
  const APIURL = ApiURL();

  const submitEvent = async () => {
    try {
      const response = await axios.post(`${APIURL}register/`, {
        username,
        email,
        password,
      });

      console.log("Registration successful:", response.data);
      toast.success("Registration successful!");
      navigate("/login"); // Navigate to login page upon success
    } catch (error) {
      console.error("There was an error registering:", error);
      toast.error("Registration failed. Please try again.");
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
            id="email"
            type="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}
