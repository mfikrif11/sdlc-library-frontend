
import { ChevronDownIcon } from "@chakra-ui/icons"
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  color,

  Box,
  Button,

  Container,
  Flex,
  Grid,
  GridItem,

  HStack,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
   
} from "@chakra-ui/react";

import { useEffect, useState } from "react"
import { axiosInstance } from "../api"
import Book from "../components/Book"
import { Link } from "react-router-dom";
import plankton from "../assets/plankton.png";
import libraryImage from "../assets/Reading glasses-bro.png";

const Home = () => {
  const [books, setBooks] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [sort, setSort] = useState("")

  const [inputFilter, setInputFilter] = useState("")
  const [currentFilter, setCurrentFilter] = useState("")
  // const [minPage, setMinPage] = useState(1)
  // const [fruits, setFruits] = useState([...fetchBooks()])
  const filterBtnHandler = () => {
    setCurrentFilter(inputFilter)
  }

  // const renderFruits = () => {
  //   return fruits.map((val) => {
  //     if (val.toLowerCase().includes(currentFilter.toLowerCase())) {
  //       return <li>{val}</li>
  //     }
  //   })
  // }

  const fetchBooks = async () => {
    const maxItemsPerPage = 12

    try {
      const response = await axiosInstance.get(`books?_sortBy=${setSort}`, {
        params: {
          _page: page,
          _limit: maxItemsPerPage,
        },
      })

      setTotalCount(response.data.dataCount)
      setMaxPage(Math.ceil(response.data.dataCount / maxItemsPerPage))

      if (page === 1) {
        setBooks(response.data.data)
        // setMinPage(Math.ceil(response.data.dataCount / maxItemsPerPage))
      } else {
        setBooks(response.data.data)
      }
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
  const sortBook = () => {
    setSort(sort + "")
  }

  const seeMoreBtnHandler = () => {
    setPage(page + 1)
  }
  const previouspage = () => {
    setPage(page - 1)
  }
  useEffect(() => {
    fetchBooks()
  }, [page])


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
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <GridItem>
                <Box display={"flex"} mt="80px">
                  <Text
                    fontSize={"18px"}
                    my="auto"
                    mr={"20px"}
                    fontWeight="semibold"
                  >
                    Filter
                  </Text>
                  <Menu>
                    <MenuButton as={Button}>Genre</MenuButton>
                    <MenuList>
                      <MenuItem>Action</MenuItem>
                      <MenuItem>Adventure</MenuItem>
                      <MenuItem>Biography</MenuItem>
                      <MenuItem>Comedy</MenuItem>
                      <MenuItem>Coming Of Age</MenuItem>
                      <MenuItem>Education</MenuItem>
                      <MenuItem>Fantasy</MenuItem>
                      <MenuItem>Fiction</MenuItem>
                      <MenuItem>Historical</MenuItem>
                      <MenuItem>Religion</MenuItem>
                      <MenuItem>Romance</MenuItem>
                      <MenuItem>Sci-fi</MenuItem>
                      <MenuItem>Self-help book</MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </GridItem>
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
              Our Books
            </Text>
              </GridItem>
              <GridItem display={"flex"}>
                <Box display={"flex"} mt="80px" justifyContent={"left"}>
                  <Input
                    placeholder="Search"
                    onChange={(event) => {
                      setInputFilter(event.target.value)
                    }}
                  />
                  <Button
                    ml={"1"}
                    bgColor="#43615f"
                    color={"white"}
                    onClick={filterBtnHandler}
                  >
                    Search
                  </Button>
                </Box>
                <Box display={"flex"} mt="80px" justifyContent={"right"}>
                  <Text
                    fontSize={"18px"}
                    my="auto"
                    mr={"20px"}
                    ml={"20px"}
                    fontWeight="semibold"
                  >
                    Sort
                  </Text>

                  <Select width={"120px"}>
                    <option value="title" onClick={sortBook}>
                      A - Z
                    </option>
                    <option value="desc">Z - A</option>
                    <option value="latest">Latest</option>
                    <option value="old">Old</option>
                  </Select>
                </Box>
              </GridItem>
            </Grid>


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

            <Grid templateColumns="repeat(3, 1fr)" mt="15px">
              <GridItem />
              <GridItem />
              <GridItem>
                <HStack justifyContent={"end"} gap="2px">
                  {page === 1 ? null : (
                    <Button
                      bgColor={"#43615f"}
                      onClick={previouspage}
                      color="white"
                    >
                      Prev
                    </Button>
                  )}
                  {!books.length ? (
                    <Alert status="warning">
                      <AlertIcon />
                      <AlertTitle>No posts found</AlertTitle>
                    </Alert>
                  ) : null}
                  {page >= maxPage ? null : (
                    <Button
                      bgColor={"#43615f"}
                      color="white"
                      onClick={seeMoreBtnHandler}
                      // isDisabled={books.length <= totalCount}
                    >
                      Next
                    </Button>
                  )}
                </HStack>
              </GridItem>
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
  )
}

export default Home
