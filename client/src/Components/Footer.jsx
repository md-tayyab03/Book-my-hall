import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  IconButton,
  Link,
  SimpleGrid,
  Heading,
  Input,
  Button,
  HStack,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaArrowRight,z
} from 'react-icons/fa';

const Footer = (props) => {
  const bgColor = useColorModeValue('gray.800', 'gray.900');
  const textColor = useColorModeValue('gray.300', 'gray.400');
  const borderColor = useColorModeValue('gray.700', 'gray.600');

  return (
    <Box bg={bgColor} color="white" {...props}>
      {/* Main Footer Content */}
      <Container maxW="container.xl" py={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={7}>
          {/* Company Info */}
          <VStack align="start" spacing={5}>
            <Heading size="md" color="white">BookMyHall</Heading>
            <Text color={textColor} fontSize="md" maxW="260px">
              Your trusted partner for booking the perfect venue for any occasion.
            </Text>
            <HStack spacing={3}>
              <IconButton aria-label="Facebook" icon={<FaFacebook />} size="md" colorScheme="facebook" variant="ghost" />
              <IconButton aria-label="Twitter" icon={<FaTwitter />} size="md" colorScheme="twitter" variant="ghost" />
              <IconButton aria-label="Instagram" icon={<FaInstagram />} size="md" colorScheme="pink" variant="ghost" />
              <IconButton aria-label="LinkedIn" icon={<FaLinkedin />} size="md" colorScheme="linkedin" variant="ghost" />
            </HStack>
          </VStack>

          {/* Quick Links */}
          <VStack align="start" spacing={5}>
            <Heading size="md" color="white">Quick Links</Heading>
            <VStack align="start" spacing={2} fontSize="md">
              <Link href="/" color={textColor} _hover={{ color: 'white' }}>Home</Link>
              <Link href="/halllist" color={textColor} _hover={{ color: 'white' }}>Hall List</Link>
              <Link href="/contacts" color={textColor} _hover={{ color: 'white' }}>Contact Us</Link>
              <Link href="/login" color={textColor} _hover={{ color: 'white' }}>Login</Link>
            </VStack>
          </VStack>

          {/* Contact Info */}
          <VStack align="start" spacing={5}>
            <Heading size="md" color="white">Contact Info</Heading>
            <VStack align="start" spacing={2} fontSize="md">
              <HStack spacing={3}><Icon as={FaPhone} color="blue.400" boxSize={5} /><Text color={textColor}>+1 (555) 123-4567</Text></HStack>
              <HStack spacing={3}><Icon as={FaEnvelope} color="blue.400" boxSize={5} /><Text color={textColor}>info@hallbooking.com</Text></HStack>
              <HStack spacing={3}><Icon as={FaMapMarkerAlt} color="blue.400" boxSize={5} /><Text color={textColor}>Event Street, City, Country</Text></HStack>
            </VStack>
          </VStack>

          {/* Newsletter (intermediate) */}
          <VStack align="start" spacing={5}>
            <Heading size="md" color="white">Newsletter</Heading>
            <Text color={textColor} fontSize="md">Subscribe for updates and special offers.</Text>
            <HStack spacing={0} width="100%" mt={2}>
              <Input
                placeholder="Enter your email"
                size="md"
                bg="gray.700"
                border="none"
                borderRadius="md"
                _focus={{ border: '1px solid', borderColor: 'blue.400' }}
                _placeholder={{ color: 'gray.400' }}
                height="48px"
                fontSize="md"
              />
              <Button
                rightIcon={<FaArrowRight />} 
                colorScheme="blue" 
                size="md"
                height="48px"
                borderLeftRadius={0}
                borderRightRadius="md"
                px={6}
                fontWeight="bold"
                ml={-1}
              >
                Subscribe
              </Button>
            </HStack>
          </VStack>
        </SimpleGrid>
      </Container>

      {/* Bottom Bar */}
      <Box borderTopWidth={1} borderStyle="solid" borderColor={borderColor}>
        <Container maxW="container.xl" py={4}>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4} justify="space-between" align="center">
            <Text color={textColor} fontSize="sm">© 2025 BookMyHall. All rights reserved</Text>
            <HStack spacing={5} fontSize="sm">
              <Link href="#" color={textColor} _hover={{ color: 'white' }}>Privacy Policy</Link>
              <Link href="#" color={textColor} _hover={{ color: 'white' }}>Terms of Service</Link>
              <Link href="#" color={textColor} _hover={{ color: 'white' }}>Cookie Policy</Link>
            </HStack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer; 