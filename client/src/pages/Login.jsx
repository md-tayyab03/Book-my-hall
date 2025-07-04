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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/");
      // Redirect or update UI as needed
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh" py={20}>
      <Container maxW="md" boxShadow="2xl" borderRadius="2xl" bg="white" p={8}>
        <Stack spacing={6} align="center">
          <Heading size="lg">Login to Your Account</Heading>
          <form style={{ width: "100%" }} onSubmit={handleLogin}>
            <Stack spacing={4}>
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
              <Button colorScheme="blue" type="submit" size="lg" borderRadius="xl" width="full">
                Login
              </Button>
            </Stack>
          </form>
          <Text fontSize="sm">
            Don't have an account?{' '}
            <Link as={RouterLink} to="/signup" color="blue.500" fontWeight="bold">
              Sign Up
            </Link>
          </Text>
        </Stack>
      </Container>
    </Box>
  );
} 