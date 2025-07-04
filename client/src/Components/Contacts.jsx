import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa";

export default function Contacts() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add form submission logic
  };

  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh" py={20}>
      <Container maxW="lg" boxShadow="2xl" borderRadius="2xl" bg="white" p={8}>
        <VStack spacing={6} align="center">
          <HStack spacing={3}>
            <Icon as={FaEnvelope} boxSize={8} color="blue.500" />
            <Heading size="lg">Contact Us</Heading>
          </HStack>
          <Text color="gray.600" textAlign="center">
            For any queries, reach out to us or fill the form below.
          </Text>
          <Stack spacing={4} w="100%">
            <Box bg={useColorModeValue("gray.100", "gray.700")} p={4} borderRadius="lg" w="100%">
              <Text fontWeight="bold">Contact Information:</Text>
              <HStack mt={1} spacing={2}>
                <Icon as={FaPhone} />
                <Text>+1 (555) 123-4567</Text>
              </HStack>
              <HStack mt={1} spacing={2}>
                <Icon as={FaEnvelope} />
                <Text>info@bookmyhall.com</Text>
              </HStack>
            </Box>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Your Name</FormLabel>
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Message</FormLabel>
                  <Textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your message..." rows={4} />
                </FormControl>
                <Button colorScheme="blue" type="submit" size="lg" borderRadius="xl" width="full">
                  Send Message
                </Button>
              </Stack>
            </form>
          </Stack>
        </VStack>
      </Container>
    </Box>
  );
}
