import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ApiURL from "../BaseURL/ApiURL";

export default function Sidebar() {
  const [friends, setFriends] = useState([]);
  const APIURL = ApiURL();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${APIURL}friends/`, {
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
          <Link to={`/chat/${friend.id}/${friend.username}`}>
            <ListItem
              button
              key={friend.id}
              style={{
                padding: "10px 20px",
                borderBottom: "1px solid #34495e",
              }}
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
          </Link>
        ))}
      </List>
    </div>
  );
}
