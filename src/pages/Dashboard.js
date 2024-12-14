import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({ userId }) => {
  const [users, setUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");  // To store error messages

  // Fetch all users except the logged-in user
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/${userId}/list`)
      .then((response) => {
        if (response.data.length === 0) {
          setErrorMessage("No users are registered till now");
        } else {
          setUsers(response.data);
          setErrorMessage(""); // Reset error message if users are fetched
        }
      })
      .catch(() => {
        setErrorMessage("An error occurred while fetching the user list");
      });
  }, [userId]);

  // Follow or unfollow a user
  const toggleFollow = (followeeId) => {
    const url = followedUsers.includes(followeeId)
      ? `http://localhost:8080/api/users/${userId}/unfollow/${followeeId}`
      : `http://localhost:8080/api/users/${userId}/follow/${followeeId}`;

    axios.post(url).then(() => {
      if (followedUsers.includes(followeeId)) {
        setFollowedUsers(followedUsers.filter((id) => id !== followeeId));
      } else {
        setFollowedUsers([...followedUsers, followeeId]);
      }
    });
  };

  // Post a message
  const postMessage = () => {
    if (message.length > 250) {
      alert("Message exceeds 250 characters");
      return;
    }

    axios
      .post(`http://localhost:8080/api/users/${userId}/posts`, { message })
      .then((response) => {
        setPosts([response.data, ...posts]);
        setMessage("");
      });
  };

  // Fetch real-time alerts using Server-Sent Events (SSE)
  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:8080/api/notifications/${userId}`
    );

    eventSource.onmessage = (event) => {
      setAlerts((prevAlerts) => [...prevAlerts, event.data]);
    };

    return () => {
      eventSource.close();
    };
  }, [userId]);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>

      {/* Display error message if there are no users */}
      {errorMessage && <p>{errorMessage}</p>}

      <div>
        <h2>Post a Message</h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
          maxLength={250}
        />
        <button onClick={postMessage}>Post</button>
      </div>

      <div>
        <h2>All Users</h2>
        {/* Check if there are any users to display */}
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id}>
              <p>{user.name}</p>
              <button onClick={() => toggleFollow(user.id)}>
                {followedUsers.includes(user.id) ? "Unfollow" : "Follow"}
              </button>
            </div>
          ))
        ) : (
          <p>No users available</p> // If no users, show this message
        )}
      </div>

      <div>
        <h2>Recent Posts</h2>
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.message}</p>
            <small>By User {post.user.name}</small>
          </div>
        ))}
      </div>

      <div>
        <h2>Alerts</h2>
        {alerts.map((alert, index) => (
          <p key={index}>{alert}</p>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
