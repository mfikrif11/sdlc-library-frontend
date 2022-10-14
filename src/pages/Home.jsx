import {

  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../api";
import Book from "../components/Book";
import plankton from "../assets/plankton.png";
import libraryImage from "../assets/Reading glasses-bro.png";

const Home = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get("/books");
      setBooks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderBooks = () => {
    return books.map((val) => {
      return (
        <Book
          key={val.id.toString()}
          title={val.title}
          image_url={val.image_url}
          author={val.author}
          genre={val.genre}
          publish_date={val.publish_date}
        />
      );
    });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <Box marginTop="120px">
        <Grid
          templateColumns={{
            lg: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            base: "repeat(1, 1fr)",
          }}
          gap={6}
          // mt={"30px"}
        >
          <GridItem>
            <Text
              fontSize={"50px"}
              fontStyle="sans-serif"
              fontWeight={"bold"}
              textAlign={"center"}
            >
              Welcome to
              <br />
              Chumbucket
            </Text>
            <Flex justifyContent={"center"} mt={"20px"} mb={"40px"}>
              <Image
                // boxSize="100px"
                objectFit="cover"
                src={plankton}
                alt="plankton"
                height={"250px"}
                display={{ base: "none", lg: "initial" }}
              />
              <Image
                // boxSize="100px"
                objectFit="cover"
                src={libraryImage}
                alt="plankton"
                height={"250px"}
                ml={{ base: "40px" }}
              />
            </Flex>
          </GridItem>
          <GridItem padding={"30px 30px 30px 30px"} height="100%">
            <Grid templateRows=".2fr 1fr .2fr">
              <GridItem></GridItem>
              <GridItem>
                <Box>
                  <Text
                    fontSize={"18px"}
                    fontFamily="sans-serif"
                    fontStyle={"Open Sans"}
                    fontWeight="thin"
                    marginTop={{ lg: "40px", base: "none", md: "none" }}
                  >
                    This library was created by the noble plankton, Mr.
                    Plankton. He has a vision and mission to educate bikini
                    bottom residents by reading.
                    <Text fontWeight={"bold"}>
                      Feel free to take a look at our collection of books.
                    </Text>
                  </Text>
                </Box>
                <a href="#ourbooks">
                  <Button
                    margin={"39px auto 0 0"}
                    padding="16px 54px 17px 53px"
                    backgroundColor={"#43615f"}
                    color="white"
                    borderRadius={"20px"}
                    // _hover={"fontColor: #43615f"}
                  >
                    See Books
                  </Button>
                </a>
              </GridItem>
              <GridItem></GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Box>
      <Box backgroundColor={"#eff3f9"} height="auto" width={"fit-content"}>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem></GridItem>
          <GridItem>
            <Text
              textAlign={"center"}
              fontSize={"4xl"}
              fontWeight={"bold"}
              fontFamily="sans-serif"
              justifyContent={"center"}
              mt="30px"
              id="ourbooks"

            >
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem></GridItem>
                    <GridItem>
                        <Text
                            textAlign={"center"}
                            fontSize="48px"
                            fontWeight={"bold"}
                            fontFamily="sans-serif"
                            justifyContent={"center"}
                            mt="60px"
                            id="ourbooks"
                        >
                            Our Books
                        </Text>
            <Grid
              templateColumns={{
                md: "repeat(3, 1fr)",
                lg: "repeat(6, 1fr)",
                base: "repeat(2, 1fr)",
              }}
              gap={4}
              mt="15px"
            >
              {renderBooks()}
            </Grid>
          </GridItem>
          <GridItem></GridItem>
        </Grid>
        <Box
          backgroundColor={"#43615f"}
          textAlign={"center"}
          padding={"30px"}
          mt={"30px"}
        >
          <Text fontSize={"20px"} color="white" fontWeight={"bold"}>
            <Text fontWeight={"light"}>Contact Us</Text>
            <a
              href={
                "https://mail.google.com/mail/u/0/#inbox?compose=XBcJlJmnndWrdwHmRxmMRDJSBQFvQnCCpfhwBZdNFnTldsBKfkDvHRSSPsPzJmSBTmgxBGDbMcZCKKjQ"
              }
            >
              chumbucket.library@gmail.com
            </a>
          </Text>
          <Text color={"white"}>Jl. Raya Bikini Bottom, Depan Krusty Krab</Text>
        </Box>
      </Box>
    </>
  );
};


export default Home;
