import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  Select,
  Text,
} from "@chakra-ui/react"

import { useEffect, useRef, useState } from "react"
import { axiosInstance } from "../api"
import Book from "../components/Book"
import plankton from "../assets/plankton.png"
import libraryImage from "../assets/Reading glasses-bro.png"
import { useFormik } from "formik"

const Home = () => {
  const bookRef = useRef(null)

  const [books, setBooks] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  const [sortBy, setSortBy] = useState("title")
  const [sortDir, setSortDir] = useState("ASC")
  const [filter, setFilter] = useState("All")
  const [currentSearch, setCurrentSearch] = useState("")

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: ({ search }) => {
      setCurrentSearch(search)
      setPage(1)
    },
  })

  const fetchBooks = async () => {
    const maxItemsPerPage = 12

    try {
      const response = await axiosInstance.get(`/books`, {
        params: {
          _page: page,
          _limit: maxItemsPerPage,
          _sortBy: sortBy,
          _sortDir: sortDir,
          CategoryId: filter,
          title: currentSearch,
          author: currentSearch,
        },
      })
      console.log(response)

      setTotalCount(response.data.dataCount)
      setMaxPage(Math.ceil(response.data.dataCount / maxItemsPerPage))

      if (page === 1) {
        setBooks(response.data.data)
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
          category_name={val.Category.category_name}
          publish_date={val.publish_date}
          id={val.id}
        />
      )
    })
  }

  const sortBookHandler = ({ target }) => {
    const { value } = target

    setSortBy(value.split(" ")[0])
    setSortDir(value.split(" ")[1])
  }

  const filterBookHandler = ({ target }) => {
    const { value } = target

    console.log(value)
    setFilter(value)
  }

  const seeMoreBtnHandler = () => {
    setPage(page + 1)
  }

  const previouspage = () => {
    setPage(page - 1)
  }

  useEffect(() => {
    fetchBooks()
  }, [page, sortBy, sortDir, filter, currentSearch])

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  return (
    <>
      {/* Welcome */}
      <Box marginTop="120px">
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
                objectFit="cover"
                src={plankton}
                alt="plankton"
                height={"250px"}
                display={{ base: "none", lg: "initial" }}
              />
              <Image
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

                <Button
                  margin={"39px auto 0 0"}
                  padding="16px 54px 17px 53px"
                  backgroundColor={"#43615f"}
                  color="white"
                  borderRadius={"20px"}
                  onClick={() => {
                    window.scrollTo({
                      top: bookRef.current.offsetTop + 23,
                      behavior: "smooth",
                    })
                  }}
                >
                  See Books
                </Button>
              </GridItem>
              <GridItem></GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Box>

      {/* OurBooks */}
      <Box
        backgroundColor={"#eff3f9"}
        height="auto"
        width={"fit-content"}
        pb="4"
      >
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={6}
          padding="6"
        >
          {/* laptop */}
          <GridItem display={{ base: "none", md: "none", lg: "flex" }}>
            <Box my="auto" display={"flex"} marginX="auto">
              <Box my={"auto"}>
                <Text fontSize={"18px"} fontWeight="semibold" mr={"2"}>
                  Filter
                </Text>
              </Box>

              <Box mr={"2"}>
                <Select onChange={filterBookHandler}>
                  <option value={"All"}>All</option>
                  <option value={1}>Action</option>
                  <option value={2}>Adventure</option>
                  <option value={3}>Biography</option>
                  <option value={4}>Coming Of Age</option>
                  <option value={5}>Comedy</option>
                  <option value={6}>Education</option>
                  <option value={7}>Fantasy</option>
                  <option value={8}>Fiction</option>
                  <option value={9}>Historical</option>
                  <option value={10}>Religion</option>
                  <option value={11}>Romance</option>
                  <option value={12}>Sci-fi</option>
                  <option value={13}>Self-help book</option>
                </Select>
              </Box>

              <Box
                display={{ base: "none", md: "none", lg: "flex" }}
                justifyContent={"right"}
                my={"auto"}
              >
                <Text
                  fontSize={"18px"}
                  fontWeight="semibold"
                  my={"auto"}
                  mr="2"
                >
                  Sort
                </Text>

                <Select onChange={sortBookHandler}>
                  <option value="title ASC">A - Z</option>
                  <option value="title DESC">Z - A</option>
                  <option value="publish_date DESC">Latest</option>
                  <option value="publish_date ASC">Old</option>
                </Select>
              </Box>
            </Box>
          </GridItem>

          <GridItem>
            <Text
              textAlign={"center"}
              fontSize={"4xl"}
              fontWeight={"bold"}
              fontFamily="sans-serif"
              justifyContent={"center"}
              my={"auto"}
              id="ourbooks"
              ref={bookRef}
            >
              Our Books
            </Text>
          </GridItem>

          <GridItem display={"flex"}>
            <Box display={"flex"} marginX="auto">
              <Box display={"flex"} my={"auto"} mr="2">
                <form onSubmit={formik.handleSubmit}>
                  <FormControl isInvalid={formik.errors.search}>
                    <Input
                      placeholder="Search"
                      name="search"
                      width={"auto"}
                      value={formik.values.search}
                      onChange={formChangeHandler}
                    />
                    <Button
                      bgColor="#43615f"
                      color={"white"}
                      type="submit"
                      ml="1"
                      mb="1"
                    >
                      Search
                    </Button>
                  </FormControl>
                </form>
              </Box>
            </Box>
          </GridItem>

          {/* hp & ipad */}
          <GridItem display={{ base: "flex", md: "flex", lg: "none" }}>
            <Box my="auto" display={"flex"} marginX="auto">
              <Box my={"auto"}>
                <Text fontSize={"18px"} fontWeight="semibold" mr={"2"}>
                  Filter
                </Text>
              </Box>

              <Box mr={"6"}>
                <Select onChange={filterBookHandler}>
                  <option>All</option>
                  <option value={1}>Action</option>
                  <option value={2}>Adventure</option>
                  <option value={3}>Biography</option>
                  <option value={4}>Coming Of Age</option>
                  <option value={5}>Comedy</option>
                  <option value={6}>Education</option>
                  <option value={7}>Fantasy</option>
                  <option value={8}>Fiction</option>
                  <option value={9}>Historical</option>
                  <option value={10}>Religion</option>
                  <option value={11}>Romance</option>
                  <option value={12}>Sci-fi</option>
                  <option value={13}>Self-help book</option>
                </Select>
              </Box>

              <Box display={"flex"}>
                <Text
                  fontSize={"18px"}
                  fontWeight="semibold"
                  my={"auto"}
                  mr="2"
                >
                  Sort
                </Text>

                <Select placeholder="Sort" onChange={sortBookHandler}>
                  <option value="title ASC">A - Z</option>
                  <option value="title DESC">Z - A</option>
                  <option value="publish_date DESC">Latest</option>
                  <option value="publish_date ASC">Old</option>
                </Select>
              </Box>
            </Box>
          </GridItem>
        </Grid>

        {/* render books */}
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem></GridItem>

          <GridItem>
            <Grid
              templateColumns={{
                base: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(6, 1fr)",
              }}
              gap={4}
              mt="15px"
            >
              {renderBooks()}
            </Grid>

            <Grid templateColumns="repeat(3, 1fr)" mt="15px">
              <GridItem />
              <GridItem>
                {!books.length ? (
                  <Alert status="warning" bgColor={"#43615f"}>
                    <AlertIcon />
                    <AlertTitle color={"white"} fontWeight="light">
                      No books found
                    </AlertTitle>
                  </Alert>
                ) : null}
              </GridItem>

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

                  {page >= maxPage ? null : (
                    <Button
                      bgColor={"#43615f"}
                      color="white"
                      onClick={seeMoreBtnHandler}
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
      </Box>

      {/* Contact Us */}
      <Box
        backgroundColor={"#43615f"}
        textAlign={"center"}
        padding={"30px"}
        // mt={"30px"}
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
    </>
  )
}

export default Home
