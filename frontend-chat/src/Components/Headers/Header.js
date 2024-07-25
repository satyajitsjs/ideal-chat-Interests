import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Application
        </Typography>
        {!isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/user">
              User
            </Button>
            <Button color="inherit" component={Link} to="/chat/*/*">
              Chat
            </Button>
            <Button color="inherit" component={Link} to="/friends">
              Requests
            </Button>
            <Button color="inherit" component={Link} to="/userlist">
              User List
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
