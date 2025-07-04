import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Button,
  useColorModeValue,
  Badge,
  VStack,
  HStack,
  Spinner,
  Alert,
  AlertIcon,
  Center
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';

const HallCard = ({ hall, fetchHalls, openBookingModal }) => {
  const navigate = useNavigate();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      maxW="xs"
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      bg={bg}
      borderColor={borderColor}
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: '2xl',
      }}
      boxShadow="md"
    >
      <Image
        src={hall.images && hall.images.length > 0 ? hall.images[0] : ''}
        alt={hall.name}
        height="120px"
        width="100%"
        objectFit="cover"
      />
      <Box p={3}>
        <VStack align="start" spacing={2}>
          <Heading size="md">{hall.name}</Heading>
          <HStack>
            {hall.block && <Badge colorScheme="blue">Block {hall.block}</Badge>}
            {hall.category && <Badge colorScheme="green">{hall.category}</Badge>}
          </HStack>
          <Text fontSize="sm" color="gray.500" noOfLines={2}>
            {hall.address}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Price: {hall.price}
          </Text>
          <Button
            colorScheme="blue"
            size="sm"
            width="full"
            onClick={() => navigate('/hallbooking', { state: hall })}
          >
            Book Now
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

const HallList = () => {
  const location = useLocation();
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredHalls, setFilteredHalls] = useState([]);

  const fetchHalls = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/halls`);
      const data = await response.json();
      setHalls(data.filter(hall => hall.status === 'available'));
      setError(null);
    } catch (err) {
      setError('Failed to fetch halls.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHalls();
  }, []);

  useEffect(() => {
    // Get category from location state if available
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location]);

  useEffect(() => {
    // Filter halls based on selected category
    console.log('Filtering for category:', selectedCategory, halls);
    if (selectedCategory === 'All') {
      setFilteredHalls(halls);
    } else {
      setFilteredHalls(halls.filter(hall => hall.category === selectedCategory));
    }
  }, [selectedCategory, halls]);

  if (loading) {
    return <Center py={20}><Spinner size="xl" /></Center>;
  }
  if (error) {
    return <Alert status="error"><AlertIcon />{error}</Alert>;
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center" py={8}>
          <Heading size="xl" mb={4}>
            {selectedCategory === 'All' ? 'All Halls' : selectedCategory}
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Find the perfect venue for your event
          </Text>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {filteredHalls.map((hall) => (
            <HallCard key={hall._id} hall={hall} fetchHalls={fetchHalls} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default HallList; 