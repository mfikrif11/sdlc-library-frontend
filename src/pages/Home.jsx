import {
  Box,
  Button,
  color,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { axiosInstance } from "../api"
import Book from "../components/Book"

const Home = () => {
  const [books, setBooks] = useState([])

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get("/books")
      setBooks(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

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
      )
    })
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <>
      <Box height={"auto"} marginTop="100px" bgRepeat="repeat">
        <Grid
          templateColumns={{
            lg: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            base: "repeat(1, 1fr)",
          }}
          gap={6}
        >
          <GridItem>
            <Text
              fontSize={"60px"}
              fontStyle="sans-serif"
              fontWeight={"bold"}
              margin={"-21px 0px 0px 50px"}
            >
              Welcome to Chumbucket
            </Text>
            <Box margin={"20px auto 0px 0px"}>
              <Image
                // boxSize="100px"
                objectFit="cover"
                src="https://storyset.com/illustration/bibliophile/rafiki"
                alt="Dan Abramov"
              />
            </Box>
          </GridItem>
          <GridItem padding={"30px 80px 30px 30px"} height="100%">
            <Grid templateRows=".2fr 1fr .2fr" gap={6}>
              <GridItem></GridItem>
              <GridItem>
                <Box>
                  <Text
                    fontSize={"18px"}
                    fontFamily="sans-serif"
                    fontStyle={"Open Sans"}
                    fontWeight="thin"
                  >
                    We combine local knowledge with global expertise, strategy
                    with design, empathy with creativity, meaning with magic.
                    Reach out to discuss how we might help you accelerate
                    change.
                    <Text fontWeight={"bold"}>
                      Duis aute irure dolor in reprehenderit
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

      <Box
        backgroundColor={"#eff3f9"}
        height="auto"
        // width={"100%"}
        paddingBottom="15px"
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
      </Box>

      <Box
        backgroundColor={"#43615f"}
        height={"auto"}
        width="100%"
        textAlign={"center"}
      >
        <Text
          fontSize={"4xl"}
          color="white"
          fontWeight={"bold"}
          padding={"54px 0"}
        >
          Contact us{" "}
          <a
            href={
              "https://mail.google.com/mail/u/0/#inbox?compose=XBcJlJmnndWrdwHmRxmMRDJSBQFvQnCCpfhwBZdNFnTldsBKfkDvHRSSPsPzJmSBTmgxBGDbMcZCKKjQ"
            }
          >
            chumbucket.library@gmail.com
          </a>
        </Text>
      </Box>
    </>
  )
}

export default Home
