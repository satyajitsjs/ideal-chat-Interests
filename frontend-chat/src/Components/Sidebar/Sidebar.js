import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Avatar, Typography } from '@mui/material';

export default function Sidebar() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/friends/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setFriends(response.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="sidebar">
      <Typography
        variant="h4"
        component="h1"
        style={{ margin: "20px 0", textAlign: "center", color: "#ecf0f1" }}
      >
        Friends List
      </Typography>
      <List>
        {friends.map((friend) => (
          <ListItem
            button
            key={friend.id}
            style={{ padding: "10px 20px", borderBottom: "1px solid #34495e" }}
          >
            <Avatar alt={friend.username} src="/path/to/avatar.jpg" />
            <ListItemText
              primary={friend.username}
              secondary={friend.email}
              style={{ marginLeft: "15px" }}
              primaryTypographyProps={{ style: { color: "#ecf0f1" } }}
              secondaryTypographyProps={{ style: { color: "#bdc3c7" } }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
