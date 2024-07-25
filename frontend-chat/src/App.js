import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserDetails from "./pages/userDetails";
import UserList from "./pages/UserList";
import { ToastContainer } from "react-toastify";
import Chat from "./pages/Chat";
import ShowInvites from "./pages/ShowInvites";
import "./App.css"

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<UserDetails />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/chat/:friendId/:username" element={<Chat />} />
            <Route path="/friends" element={<ShowInvites />} />
          </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
