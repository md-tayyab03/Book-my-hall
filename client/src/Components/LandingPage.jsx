import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Image,
  SimpleGrid,
  useColorModeValue,
  Flex,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  Badge,
  HStack,
  useBreakpointValue,
  keyframes,
  Avatar,
  AvatarGroup,
  Stack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { 
  FaCalendarAlt, 
  FaUsers, 
  FaStar, 
  FaCheckCircle, 
  FaArrowRight,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const LandingPage = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const cardBg = useColorModeValue('white', 'gray.700');
  const isMobile = useBreakpointValue({ base: true, md: false });

  const features = [
    {
      title: 'Easy Booking',
      description: 'Book your perfect venue in just a few clicks with our streamlined process',
      icon: FaCalendarAlt,
      color: 'blue.500',
    },
    {
      title: 'Multiple Venues',
      description: 'Choose from our wide range of halls and venues for any occasion',
      icon: FaUsers,
      color: 'green.500',
    },
    {
      title: 'Verified Venues',
      description: 'All our venues are verified and quality-checked for your peace of mind',
      icon: FaCheckCircle,
      color: 'purple.500',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah J.',
      role: 'Wedding Planner',
      text: 'The platform made it so easy to find and book the perfect venue for my client\'s wedding. Highly recommended!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
    {
      name: 'Michael C.',
      role: 'Corporate Event Manager',
      text: 'Great selection of venues and excellent customer service. Will definitely use again!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
    {
      name: 'Priya S.',
      role: 'Birthday Party Organizer',
      text: 'Found the perfect hall for my daughter\'s birthday party. The booking process was smooth and hassle-free.',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
  ];

  const stats = [
    { label: 'Venues Available', value: '100+', icon: FaMapMarkerAlt },
    { label: 'Happy Customers', value: '5000+', icon: FaUsers },
    { label: 'Events Booked', value: '10000+', icon: FaCalendarAlt },
    { label: 'Cities Covered', value: '20+', icon: FaMapMarkerAlt },
  ];

  const venues = [
    {
      name: 'Grand Ballroom',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      capacity: '500+',
      type: 'Wedding Venue',
    },
    {
      name: 'Business Center',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      capacity: '200+',
      type: 'Conference Hall',
    },
    {
      name: 'Garden Pavilion',
      image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      capacity: '300+',
      type: 'Outdoor Venue',
    },
    {
      name: 'Heritage Banquet',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      capacity: '400+',
      type: 'Banquet Hall',
    },
  ];

  return (
    <Box className="landing-main">
      {/* Hero Section with Parallax Effect */}
      <Box 
        position="relative"
        height={{ base: 'auto', md: '100vh' }}
        minH={{ base: '80vh', md: '100vh' }}
        overflow="hidden"
        bg="blue.800"
        py={{ base: 10, md: 0 }}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          backgroundImage="linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)"
          opacity="0.9"
        />
        <Container maxW={{ base: '95vw', md: 'container.xl' }} height="100%" position="relative" zIndex="1" px={{ base: 2, md: 8 }}>
          <Flex height={{ base: 'auto', md: '100%' }} alignItems="center" flexDirection={{ base: 'column', md: 'row' }}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 10 }} alignItems="center">
              <MotionVStack
                align="start"
                spacing={{ base: 6, md: 8 }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                w="100%"
              >
                <Badge
                  colorScheme="blue"
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontSize={{ base: 'xs', md: 'sm' }}
                  fontWeight="bold"
                >
                  #1 BookMyHall Platform
                </Badge>
                <Heading
                  as="h1"
                  size={{ base: 'lg', md: '2xl' }}
                  bgGradient="linear(to-r, blue.600, blue.800)"
                  bgClip="text"
                  fontWeight="extrabold"
                  lineHeight="1.2"
                >
                  Find Your Perfect Venue for Every Occasion
                </Heading>
                <Text fontSize={{ base: 'md', md: 'xl' }} color={textColor} maxW="lg">
                  From intimate gatherings to grand celebrations, discover and book the perfect venue that matches your vision.
                </Text>
                <HStack spacing={{ base: 2, md: 4 }} flexWrap="wrap">
                  <Button
                    size={{ base: 'md', md: 'lg' }}
                    colorScheme="blue"
                    onClick={() => navigate('/halllist')}
                    rightIcon={<FaArrowRight />}
                    _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                    transition="all 0.3s"
                  >
                    Explore Venues
                  </Button>
                  <Button
                    size={{ base: 'md', md: 'lg' }}
                    variant="outline"
                    colorScheme="blue"
                    onClick={() => {
                      if (auth.currentUser) {
                        navigate('/my-postings');
                      } else {
                        navigate('/login');
                      }
                    }}
                    _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                    transition="all 0.3s"
                  >
                    List Your Hall
                  </Button>
                </HStack>
                <HStack spacing={{ base: 2, md: 4 }} flexWrap="wrap" className="review-row-mobile">
                  <AvatarGroup size={{ base: 'sm', md: 'md' }} max={3}>
                    {testimonials.map((testimonial, index) => (
                      <Avatar key={index} src={testimonial.image} />
                    ))}
                  </AvatarGroup>
                  <Text fontSize={{ base: 'xs', md: 'sm' }} color={textColor}>
                    Trusted by 5000+ customers worldwide
                  </Text>
                </HStack>
              </MotionVStack>
              <MotionBox
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                position="relative"
                w="100%"
                display="flex"
                justifyContent={{ base: 'center', md: 'flex-end' }}
                mt={{ base: 8, md: 0 }}
              >
                <Box
                  position="relative"
                  animation={`${float} 6s ease-in-out infinite`}
                  w={{ base: '90vw', sm: '350px', md: '450px' }}
                  maxW="450px"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Event Hall"
                    borderRadius="2xl"
                    shadow="2xl"
                    w="100%"
                    h={{ base: '180px', sm: '250px', md: '320px' }}
                    objectFit="cover"
                  />
                  <Box
                    position="absolute"
                    top="-20px"
                    right="-20px"
                    bg="white"
                    p={4}
                    borderRadius="xl"
                    shadow="xl"
                    transform="rotate(3deg)"
                  >
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="bold" color="blue.500">Featured Venue</Text>
                      <Text fontSize={{ base: 'xs', md: 'sm' }} color={textColor}>Grand Ballroom</Text>
                    </VStack>
                  </Box>
                </Box>
              </MotionBox>
            </SimpleGrid>
          </Flex>
        </Container>
      </Box>

      {/* Stats Section with Icons */}
      <Box py={{ base: 10, md: 20 }} bg={bgColor}>
        <Container maxW={{ base: '95vw', md: 'container.xl' }} px={{ base: 2, md: 8 }}>
          <Box bg="white" borderRadius="2xl" boxShadow="xl" py={{ base: 6, md: 10 }} px={{ base: 2, md: 8 }}>
            <SimpleGrid columns={{ base: 2, sm: 2, md: 4 }} spacing={{ base: 4, md: 8 }}>
              {stats.map((stat, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Stat textAlign="center">
                    <Icon as={stat.icon} w={{ base: 6, md: 8 }} h={{ base: 6, md: 8 }} color="blue.500" mb={4} />
                    <StatNumber fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color="blue.500">
                      {stat.value}
                    </StatNumber>
                    <StatLabel fontSize={{ base: 'sm', md: 'md' }} color={textColor}>
                      {stat.label}
                    </StatLabel>
                  </Stat>
                </MotionBox>
              ))}
            </SimpleGrid>
          </Box>
        </Container>
      </Box>

      {/* Featured Venues Section */}
      <Box py={{ base: 10, md: 20 }} bg="gray.50">
        <Container maxW={{ base: '95vw', md: 'container.xl' }} px={{ base: 2, md: 8 }}>
          <VStack spacing={{ base: 8, md: 12 }}>
            <Heading textAlign="center" mb={8} fontSize={{ base: 'xl', md: '2xl' }}>Featured Venues</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 4, md: 8 }} justifyItems="center">
              {venues.map((venue, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  display="flex"
                  justifyContent="center"
                  w="100%"
                  maxW="350px"
                  mx="auto"
                >
                  <Box
                    maxW="350px"
                    w="100%"
                    bg="white"
                    boxShadow="xl"
                    borderRadius="2xl"
                    pos="relative"
                    zIndex={1}
                    p={5}
                    borderWidth="1px"
                    borderColor="gray.200"
                    transition="all 0.3s"
                    _hover={{ transform: 'scale(1.04) translateY(-8px)', shadow: '3xl' }}
                  >
                    <Box
                      borderRadius="2xl"
                      mt={-10}
                      pos="relative"
                      height={{ base: '120px', md: '150px' }}
                      overflow="hidden"
                    >
                      <Image
                        borderRadius="2xl"
                        height={{ base: 120, md: 160 }}
                        width={{ base: 180, md: 230 }}
                        objectFit="cover"
                        src={venue.image}
                        alt={venue.name}
                        transition="all 0.3s"
                        w="100%"
                      />
                      <Box
                        position="absolute"
                        top={3}
                        left={3}
                        bgGradient="linear(to-r, blue.500, purple.500)"
                        color="white"
                        px={3}
                        py={1}
                        borderRadius="md"
                        fontWeight="bold"
                        fontSize={{ base: 'xs', md: 'sm' }}
                        shadow="md"
                        zIndex={2}
                      >
                        Featured
                      </Box>
                    </Box>
                    <Stack spacing={1} align="center" mt={3}>
                      <Heading fontSize={{ base: 'sm', md: 'md' }} fontFamily="body" fontWeight={800} color="gray.800">
                        {venue.name}
                      </Heading>
                      <Stack direction="row" align="center">
                        <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600"><b>{venue.capacity}</b> Capacity</Text>
                        <Text color="gray.400">•</Text>
                        <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">{venue.type}</Text>
                      </Stack>
                      <Button
                        colorScheme="blue"
                        size={{ base: 'sm', md: 'sm' }}
                        width="full"
                        mt={3}
                        onClick={() => navigate('/halllist')}
                        _hover={{ bg: 'blue.600' }}
                      >
                        Book Now
                      </Button>
                    </Stack>
                  </Box>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Features Section with Cards */}
      <Box py={{ base: 10, md: 20 }} bg={bgColor}>
        <Container maxW={{ base: '95vw', md: 'container.xl' }} px={{ base: 2, md: 8 }}>
          <VStack spacing={{ base: 8, md: 12 }}>
            <Heading textAlign="center" fontSize={{ base: 'xl', md: '2xl' }}>Why Choose Us?</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 6, md: 10 }}>
              {features.map((feature, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <VStack
                    p={{ base: 4, md: 8 }}
                    bg={cardBg}
                    borderRadius="xl"
                    shadow="lg"
                    spacing={4}
                    align="start"
                    transition="all 0.3s"
                    _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
                  >
                    <Icon as={feature.icon} w={{ base: 8, md: 10 }} h={{ base: 8, md: 10 }} color={feature.color} />
                    <Heading size={{ base: 'sm', md: 'md' }}>{feature.title}</Heading>
                    <Text color={textColor} fontSize={{ base: 'sm', md: 'md' }}>{feature.description}</Text>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Testimonials Section with Cards */}
      <Box py={{ base: 10, md: 20 }} bg="gray.50">
        <Container maxW={{ base: '95vw', md: 'container.xl' }} px={{ base: 2, md: 8 }}>
          <VStack spacing={{ base: 8, md: 12 }}>
            <Heading textAlign="center" fontSize={{ base: 'xl', md: '2xl' }}>What Our Customers Say</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 8 }}>
              {testimonials.map((testimonial, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  w="100%"
                  maxW="350px"
                  mx="auto"
                >
                  <Box
                    p={{ base: 4, md: 8 }}
                    bg={cardBg}
                    borderRadius="xl"
                    shadow="lg"
                    position="relative"
                    _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
                    transition="all 0.3s"
                    w="100%"
                    maxW="350px"
                    mx="auto"
                  >
                    <VStack align="start" spacing={4}>
                      <HStack>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Icon key={i} as={FaStar} color="yellow.400" />
                        ))}
                      </HStack>
                      <Text color={textColor} fontSize={{ base: 'sm', md: 'lg' }} fontStyle="italic">
                        "{testimonial.text}"
                      </Text>
                      <HStack spacing={4}>
                        <Avatar src={testimonial.image} />
                        <Box>
                          <Text fontWeight="bold" fontSize={{ base: 'sm', md: 'md' }}>{testimonial.name}</Text>
                          <Text fontSize={{ base: 'xs', md: 'sm' }} color={textColor}>{testimonial.role}</Text>
                        </Box>
                      </HStack>
                    </VStack>
                  </Box>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section with Gradient */}
      <Box 
        py={{ base: 10, md: 20 }}
        bgGradient="linear(to-r, blue.500, purple.500)"
        color="white"
      >
        <Container maxW={{ base: '95vw', md: 'container.xl' }} px={{ base: 2, md: 8 }}>
          <VStack spacing={{ base: 6, md: 8 }} textAlign="center">
            <Heading fontSize={{ base: 'xl', md: '2xl' }}>Ready to Find Your Perfect Venue?</Heading>
            <Text fontSize={{ base: 'md', md: 'xl' }} maxW="2xl">
              Join thousands of satisfied customers who found their ideal venue through our platform.
            </Text>
            <HStack spacing={{ base: 2, md: 4 }} flexWrap="wrap" justify="center">
              <Button
                size={{ base: 'md', md: 'lg' }}
                colorScheme="whiteAlpha"
                onClick={() => navigate('/halllist')}
                rightIcon={<FaArrowRight />}
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                transition="all 0.3s"
              >
                Browse Venues
              </Button>
              <Button
                size={{ base: 'md', md: 'lg' }}
                variant="outline"
                colorScheme="whiteAlpha"
                onClick={() => navigate('/signup')}
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                transition="all 0.3s"
              >
                Sign Up Now
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Contact Section */}
      {/* (Contact section removed as per user request) */}
    </Box>
  );
};

export default LandingPage; 