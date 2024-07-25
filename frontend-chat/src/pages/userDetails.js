import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import axios from 'axios';
import Header from '../Components/Headers/Header';
import ApiURL from '../Components/BaseURL/ApiURL';

export default function UserDetails() {
  // State to store user details
  const [user, setUser] = useState(null);
  const APIURL = ApiURL();

  useEffect(() => {
    // Fetch user details from API
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${APIURL}user-details/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });

        // Set user details in state
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  if (!user) {
    return <Typography variant="h6" align="center">Welcome</Typography>;
  }

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
            Welcome, {user.username}!
          </Typography>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6">Email:</Typography>
            <Typography variant="body1">{user.email}</Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
