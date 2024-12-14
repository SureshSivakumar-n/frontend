import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#4caf50',
        color: 'white',
      }}
    >
      <h1 style={{ margin: 0 }}>MyApp</h1>
      <div>
        <Link
          to="/"
          style={{
            margin: '0 10px',
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Register
        </Link>
        <Link
          to="/dashboard"
          style={{
            margin: '0 10px',
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
