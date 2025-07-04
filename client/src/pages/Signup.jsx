import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // adjust path if needed
import { db } from "../firebase"; // Assuming db is in firebase.js
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Save user type in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        userType: "regular"
      });
      // Now redirect
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert(`Error creating user: ${error.message}`);
    }
  };

  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh" py={20}>
      <Container maxW="md" boxShadow="2xl" borderRadius="2xl" bg="white" p={8}>
        <Stack spacing={6} align="center">
          <Heading size="lg">Create an Account</Heading>
          <form style={{ width: "100%" }} onSubmit={handleSignup}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                />
              </FormControl>
              <Button colorScheme="blue" type="submit" size="lg" borderRadius="xl" width="full">
                Sign Up
              </Button>
            </Stack>
          </form>
          <Text fontSize="sm">
            Already have an account?{' '}
            <Link as={RouterLink} to="/login" color="blue.500" fontWeight="bold">
              Login
            </Link>
          </Text>
        </Stack>
      </Container>
    </Box>
  );
} 