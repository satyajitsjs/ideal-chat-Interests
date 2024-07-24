import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import axios from 'axios';
import Header from '../Components/Headers/Header';

export default function UserDetails() {
  // State to store user details
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details from API
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/user-details/', {
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
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  return (
    <>
    <Header />
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
          User Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6">First Name:</Typography>
              <Typography variant="body1">{user.first_name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6">Last Name:</Typography>
              <Typography variant="body1">{user.last_name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6">Email:</Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6">Phone:</Typography>
              <Typography variant="body1">{user.phone || 'N/A'}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
    </>
  );
}
