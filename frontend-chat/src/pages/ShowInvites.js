import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import Header from "../Components/Headers/Header";

export default function InterestRequests() {
  const [sentInterests, setSentInterests] = useState([]);
  const [receivedInterests, setReceivedInterests] = useState([]);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const token = localStorage.getItem("token");

        const sentResponse = await axios.get(
          "http://localhost:8000/api/interests/sent/",
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        setSentInterests(sentResponse.data);

        const receivedResponse = await axios.get(
          "http://localhost:8000/api/interests/received/",
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        setReceivedInterests(receivedResponse.data);
      } catch (error) {
        console.error("Error fetching interests:", error);
      }
    };

    fetchInterests();
  }, []);

  const handleUpdateInterest = async (id, accepted) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8000/api/interests/${id}/update/`,
        { accepted },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      setReceivedInterests((prevInterests) =>
        prevInterests.map((interest) =>
          interest.id === id ? { ...interest, accepted } : interest
        )
      );
    } catch (error) {
      console.error("Error updating interest:", error);
    }
  };

  const handleCancelInterest = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8000/api/interests/${id}/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      setSentInterests((prevInterests) =>
        prevInterests.filter((interest) => interest.id !== id)
      );
    } catch (error) {
      console.error("Error canceling interest:", error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 4, textAlign: "center" }}
        >
          Friend Requests
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4 }}>
          Sent Requests
        </Typography>
        <Grid container spacing={3}>
          {sentInterests.map((interest) => (
            <Grid item xs={12} sm={6} md={4} key={interest.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    To: {interest.recipient.username}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {interest.message}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Accepted: {interest.accepted ? "Yes" : "No"}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleCancelInterest(interest.id)}
                  >
                    Cancel Request
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" component="h2" sx={{ mt: 4 }}>
          Received Requests
        </Typography>
        <Grid container spacing={3}>
          {receivedInterests.map((interest) => (
            <Grid item xs={12} sm={6} md={4} key={interest.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    From: {interest.sender.username}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {interest.message}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Accepted: {interest.accepted ? "Yes" : "No"}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateInterest(interest.id, true)}
                    disabled={interest.accepted === true}
                    sx={{ mr: 2 }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleUpdateInterest(interest.id, false)}
                    disabled={interest.accepted === false}
                  >
                    Reject
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
