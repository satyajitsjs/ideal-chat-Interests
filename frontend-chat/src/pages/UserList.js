import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Components/Headers/Header";
import ApiURL from "../Components/BaseURL/ApiURL";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const APIURL = ApiURL();


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      // Configure axios request with the token
      const response = await axios.get(`${APIURL}users/`, {
        headers: {
          Authorization: `Token ${token}`, // Replace 'Token' with 'Bearer' if you're using Bearer tokens
        },
      });

      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    }
  };

  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setMessage("");
    setSelectedUser(null);
  };

  const handleSendMessage = async () => {
    if (selectedUser) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${APIURL}interests/create/`,
          {
            recipient: selectedUser.id,
            message: message,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        console.log("Message sent successfully:", response.data);
        fetchUsers();
        toast.success("Message sent successfully");
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Error sending message");
      }
    }
    handleClose();
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 4, textAlign: "center" }}
        >
          User List
        </Typography>
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card sx={{ position: "relative" }}>
                <CardContent>
                  <Typography variant="h6">{user.username}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.email}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={() => handleClickOpen(user)}
                    color="primary"
                  >
                    <AddCircleIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Add Friend</DialogTitle>
        <DialogContent>
          <Typography variant="h6">
            Send a message to {selectedUser?.first_name}{" "}
            {selectedUser?.last_name}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Message"
            type="text"
            fullWidth
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendMessage} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
