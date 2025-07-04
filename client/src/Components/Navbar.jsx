import { Avatar, Menu, MenuButton, MenuList, MenuItem, Button, HStack, Box, Text, Flex, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import React from 'react';

function Navbar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Helper to handle category navigation
  const handleCategory = (category) => {
    navigate("/halllist", { state: { category } });
    onClose();
  };

  // Helper to handle Contact Us scroll
  const handleContactUs = () => {
    if (location.pathname === "/") {
      setTimeout(() => {
        const footer = document.getElementById("footer");
        if (footer) footer.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate("/");
      setTimeout(() => {
        const footer = document.getElementById("footer");
        if (footer) footer.scrollIntoView({ behavior: "smooth" });
      }, 500); // Give time for landing page to render
    }
    onClose();
  };

  return (
    <>
      <Flex justify="space-between" align="center" p={4} bg="#eee" zIndex={1000} position="relative" wrap="wrap">
        {/* Left: Logo and website name */}
        <Box display="flex" alignItems="center" cursor="pointer" onClick={() => navigate("/")}> 
          <Box boxSize="36px" bg="blue.500" borderRadius="md" display="flex" alignItems="center" justifyContent="center" mr={2}>
            <Text color="white" fontWeight="bold" fontSize="xl">HB</Text>
          </Box>
          <Text fontWeight="bold" fontSize="xl" color="#222">BookMyHall</Text>
        </Box>
        {/* Hamburger menu for mobile */}
        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} 
            variant="ghost"
            aria-label="Open Menu"
            onClick={isOpen ? onClose : onOpen}
            fontSize="2xl"
          />
        </Box>
        {/* Right: Navigation and profile/login (hidden on mobile) */}
        <HStack spacing={4} display={{ base: "none", md: "flex" }}>
          <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
          <Button variant="ghost" onClick={() => navigate("/my-bookings")}>My Bookings</Button>
          <Menu>
            <MenuButton as={Button} variant="ghost">
              Categories
            </MenuButton>
            <MenuList zIndex={2000}>
              <MenuItem onClick={() => handleCategory("Wedding Halls")}>Wedding Halls</MenuItem>
              <MenuItem onClick={() => handleCategory("Conference Halls")}>Conference Halls</MenuItem>
              <MenuItem onClick={() => handleCategory("Party Halls")}>Party Halls</MenuItem>
              <MenuItem onClick={() => handleCategory("Others")}>Others</MenuItem>
            </MenuList>
          </Menu>
          <Button variant="ghost" onClick={handleContactUs}>Contact Us</Button>
          {user ? (
            <Menu placement="bottom-end">
              <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                <Avatar size="sm" name={user.email} />
              </MenuButton>
              <MenuList zIndex={3000} minW="150px" p={0}>
                <MenuItem onClick={() => navigate("/my-postings")}>My Postings</MenuItem>
                <MenuItem onClick={() => auth.signOut()} color="red.500">Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button onClick={() => navigate("/login")}>Login</Button>
          )}
        </HStack>
      </Flex>
      {/* Drawer for mobile navigation */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <Button w="100%" mb={2} variant="ghost" onClick={() => {navigate("/"); onClose();}}>Home</Button>
            <Button w="100%" mb={2} variant="ghost" onClick={() => {navigate("/my-bookings"); onClose();}}>My Bookings</Button>
            <Menu>
              <MenuButton as={Button} w="100%" mb={2} variant="ghost">
                Categories
              </MenuButton>
              <MenuList zIndex={2000}>
                <MenuItem onClick={() => handleCategory("Wedding Halls")}>Wedding Halls</MenuItem>
                <MenuItem onClick={() => handleCategory("Conference Halls")}>Conference Halls</MenuItem>
                <MenuItem onClick={() => handleCategory("Party Halls")}>Party Halls</MenuItem>
                <MenuItem onClick={() => handleCategory("Others")}>Others</MenuItem>
              </MenuList>
            </Menu>
            <Button w="100%" mb={2} variant="ghost" onClick={handleContactUs}>Contact Us</Button>
            {user ? (
              <Menu placement="bottom-end">
                <MenuButton as={Button} w="100%" mb={2} rounded="full" variant="link" cursor="pointer" minW={0}>
                  <Avatar size="sm" name={user.email} />
                </MenuButton>
                <MenuList zIndex={3000} minW="150px" p={0}>
                  <MenuItem onClick={() => {navigate("/my-postings"); onClose();}}>My Postings</MenuItem>
                  <MenuItem onClick={() => {auth.signOut(); onClose();}} color="red.500">Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button w="100%" onClick={() => {navigate("/login"); onClose();}}>Login</Button>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Navbar;
