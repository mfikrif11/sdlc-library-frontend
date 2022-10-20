import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import Checkbox from "./Checkbox";

const Cart = ({ image, title, author, genre, releasedYear, onDelete }) => {
  return (
    <>
      {/* HP looks */}
      <Grid
        templateAreas={`"nav main"
                  "nav footer"`}
        gridTemplateRows={"70px 1fr 10px"}
        gridTemplateColumns={"150px 1fr"}
        // h="200px"
        fontWeight="bold"
        display={{ base: "grid", lg: "none" }}
        // border={"1px"}
        borderRadius={"20px"}
        bgColor={"lightgray"}
        mt={"20px"}
      >
        <GridItem padding={"10px"} area={"nav"}>
          <Image
            height={"140px"}
            width={"28"}
            // objectFit={"cover"}
            src={
              image ||
              "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            }
            borderRadius={"20px"}
            mt={"8px"}
          />
          <Button
            bgColor={"#1b3c4b"}
            fontSize={"small"}
            size={"sm"}
            color={"white"}
            borderRadius={"full"}
            onClick={onDelete}
            mt={"5px"}
            mb={"5px"}
          >
            <AiFillDelete />
            <Text fontSize={"15px"} ml={"5px"}>
              Delete
            </Text>
          </Button>
        </GridItem>
        <GridItem
          pl="2"
          area={"main"}
          bgColor={"#1b3c4b"}
          borderRadius={"20px"}
          mt={"10px"}
          mr={"10px"}
        >
          <Text mt={"5px"} color="white">
            {title || "title"}
          </Text>
        </GridItem>
        <GridItem
          padding={"10px"}
          bg="blue.300"
          area={"footer"}
          bgColor={"#1b3c4b"}
          borderRadius={"20px"}
          mt={"10px"}
          mr={"10px"}
        >
          <Text fontSize={"sm"} color="white">
            {genre || "genre"}
            <br /> {author || "author"} <br />
            {releasedYear || "released year"}
          </Text>
        </GridItem>
      </Grid>
      {/* laptop looks*/}
      <Box
        pl={"40px"}
        pt={"10px"}
        pr={"40px"}
        bg={"white"}
        display={{ base: "none", md: "none", lg: "initial" }}
      >
        <VStack alignItems={"left"}>
          <Box bg={"lightgray"} borderRadius={"15px"}>
            <Flex color="black" fontWeight={"bold"}>
              <Box ml={"20px"} mt={"60px"}>
                <Checkbox />
              </Box>
              <Box flex="0.5">
                <Image
                  height={"140px"}
                  width={"full"}
                  objectFit={"cover"}
                  src={
                    image ||
                    "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  }
                  padding={"10px"}
                  borderRadius={"20px"}
                  ml={"10px"}
                />
              </Box>
              <Box flex="1">
                <Text mt={"55px"} textAlign={"center"}>
                  {title || "title"}
                </Text>
              </Box>
              <Box flex="1">
                <Text textAlign={"left"} mt={"35px"} ml={"20px"}>
                  Genre: {genre || "genre"}
                  <br /> Author: {author || "author"} <br />
                  Released Year: {releasedYear || "released year"}
                </Text>
              </Box>
              <Box flex="1">
                <Text textAlign={"center"} mt={"55px"}>
                  <Button
                    bgColor={"#1b3c4b"}
                    fontSize={"2xl"}
                    color={"white"}
                    borderRadius={"full"}
                    onClick={onDelete}
                  >
                    <AiFillDelete />
                    <Text fontSize={"15px"} ml={"5px"}>
                      Delete
                    </Text>
                  </Button>
                </Text>
              </Box>
            </Flex>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default Cart;
