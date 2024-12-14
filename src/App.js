import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  const [userId, setUserId] = React.useState(null);

  return (
    <ErrorBoundary>
      <Router>
      <Routes>
        <Route path="/" element={<Register onRegister={(id) => setUserId(id)} />} />
        <Route path="/dashboard" element={<Dashboard userId={userId} />} />
      </Routes>
      </Router>
      </ErrorBoundary>
    
  );
};

export default App;
