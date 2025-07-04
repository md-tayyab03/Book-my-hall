import React from "react";
import {
  Box,
  useDisclosure,
  VStack,
  Stack,
  Button,
  Collapse,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';

const NavLink = ({ children, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <RouterLink to={to}>
      <Button
        variant="ghost"
        colorScheme="blue"
        bg={isActive ? 'blue.50' : 'transparent'}
        _hover={{
          bg: 'blue.100',
        }}
        py={6}
      >
        {children}
      </Button>
    </RouterLink>
  );
};


export default function CommonPage() {
  const { isOpen} = useDisclosure();
  const [isCategoriesOpen, setCategoriesOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    navigate('/halllist', { state: { category } });
  };


  return (
    <Box>
      {/* Responsive mobile nav (hamburger menu) remains below */}
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={2} align="start">
            <NavLink to="/">Home</NavLink>
            <Box w="100%">
              <Button
                variant="ghost"
                colorScheme="blue"
                bg={isCategoriesOpen ? 'blue.50' : 'transparent'}
                _hover={{ bg: 'blue.100' }}
                py={6}
                w="100%"
                justifyContent="flex-start"
                fontWeight={500}
                fontSize="lg"
                onClick={() => setCategoriesOpen((open) => !open)}
                rightIcon={<ChevronDownIcon color="blue.700" transform={isCategoriesOpen ? 'rotate(180deg)' : 'rotate(0deg)'} />}
              >
                Categories
              </Button>
              <Collapse in={isCategoriesOpen} animateOpacity>
                <VStack spacing={1} align="center" w="100%" mt={1}>
                  <Button w="90%" variant="ghost" justifyContent="center" onClick={() => handleCategorySelect('Wedding Halls')}>Wedding Halls</Button>
                  <Button w="90%" variant="ghost" justifyContent="center" onClick={() => handleCategorySelect('Conference Halls')}>Conference Halls</Button>
                  <Button w="90%" variant="ghost" justifyContent="center" onClick={() => handleCategorySelect('Party Halls')}>Party Halls</Button>
                  <Button w="90%" variant="ghost" justifyContent="center" onClick={() => handleCategorySelect('Others')}>Others</Button>
                </VStack>
              </Collapse>
            </Box>
            <NavLink to="/contacts">Contact Us</NavLink>
            <NavLink to="/login">Login</NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
