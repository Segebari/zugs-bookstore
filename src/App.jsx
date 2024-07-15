import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth } from "./components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Navigation from "./components/Nav";
import Footer from "./components/Footer";
import Bookdetails from "./components/Bookdetails";

function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation user={user} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/book/:id" element={<Bookdetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
