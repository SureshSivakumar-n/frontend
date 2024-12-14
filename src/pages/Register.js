import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const registerUser = () => {
    axios
      .post(`http://localhost:8080/api/users/register?name=${name}`)
      .then((response) => {
        onRegister(response.data.id); // Pass userId to parent
        navigate("/dashboard"); // Navigate to the dashboard
      })
      .catch(() => {
        alert("Error registering user");
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={registerUser}>Register</button>
    </div>
  );
};

export default Register;
