import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  AspectRatio,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function HallCard(props) {
  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.500")}
        boxShadow={"xl"}
        rounded={"lg"}
        overflow="hidden"
        pos={"relative"}
        zIndex={1}
        _groupHover={{
          backgroundColor: "primary.300",
          color: "pink",
        }}
      >
        <AspectRatio ratio={16 / 9} w="100%">
          <Image
            objectFit="cover"
            src={props.imgsrc}
            alt={props.hall}
          />
        </AspectRatio>
        <Stack spacing={1} align={"center"}>
          <Text
            pt="8"
            pb="2"
            color={"gray.500"}
            fontSize={"xs"}
            textTransform={"uppercase"}
          >
            ({props.block})
          </Text>
          <Heading fontSize={"md"} fontFamily={"body"} fontWeight={800}>
            {props.hall}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text fontSize={"sm"}>Max Capacity : {props.capacity}</Text>
          </Stack>
        </Stack>
        <Link
          to="/hallbooking"
          state={props}
          style={{ textDecoration: "none" }}
        >
          <Button colorScheme="linkedin" mt="6" w="full" h="12">
            Book now
          </Button>
        </Link>
      </Box>
    </Center>
  );
}
