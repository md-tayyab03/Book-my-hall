import { ChakraProvider, theme } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Contacts from "./Components/Contacts";
import LandingPage from "./Components/LandingPage";
import CommonPage from "./pages/CommonPage";
import Footer from "./Components/Footer";
import HallList from "./Components/HallList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostHall from "./pages/PostHall";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "./Components/Navbar";
import MyPostings from "./pages/MyPostings";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import MyBookings from "./pages/MyBookings";
import HallBooking from "./pages/HallBooking";

function App() {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          setUserType(userDoc.data().userType);
        }
      } else {
        setUserType(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar user={user} userType={userType} />
        <CommonPage />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/halllist" element={<HallList />} />
          <Route exact path="/hallbooking" element={<HallBooking />} />
          <Route exact path="/contacts" element={<Contacts />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="/post-hall" element={<PostHall />} />
          <Route path="/my-postings" element={<MyPostings />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
        <Footer id="footer" />
      </Router>
    </ChakraProvider>
  );
}

export default App;
