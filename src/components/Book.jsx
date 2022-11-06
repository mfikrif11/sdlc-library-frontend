import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  useDisclosure,
  ItemList,
  Flex,
  Spacer,
} from "@chakra-ui/react"
import { Link, Navigate, useParams } from "react-router-dom"
import { useState } from "react"
import { axiosInstance } from "../api"
import { useSelector, useDispatch } from "react-redux"
import { details } from "../redux/features/bookSlice"
import { useEffect } from "react"
import { login } from "../redux/features/authSlice"
import { addItemToCart } from "../redux/features/cartSlice"

const Book = ({
  image_url,
  title,
  author,
  publish_date,
  category_name,
  id,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const params = useParams()
  const toast = useToast()
  const [bookId, setBookId] = useState(0)

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    publish_date: 0,
    category_name: "",
    image_url: "",
    description: "",
    id: "",
  })
  const authSelector = useSelector((state) => state.auth)
  const authSelector2 = useSelector((state) => state.book)

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  )

  const [overlay, setOverlay] = useState(<OverlayOne />)

  const dispatch = useDispatch()

  const fetchBookById = async () => {
    try {
      const response = await axiosInstance.get(`/books/${bookId}`)

      setBookData(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const bookBtnHandler = async () => {
    try {
      let newId = {
        BookId: bookId,
      }
      // const BookId = bookId
      const response = await axiosInstance.post(`/carts`, newId)
      fetchBookById()
      // dispatch(bookData.id)
      dispatch(addItemToCart(response.data.data))

      console.log(response.data)

      toast({
        title: "Add success",
        status: "success",
      })
    } catch (err) {
      console.log(err)
      toast({
        title: "Add failed",
        status: "error",
        description: err.response.data.message,
      })
    }
  }

  //   useEffect(() => {
  //     bookBtnHandler();
  //   }, []);

  useEffect(() => {
    fetchBookById()
  }, [bookId])

  return (
    <Box
      onClick={() => {
        setBookId(id)
        onOpen()
      }}
    >
      <Box
        width={"200px"}
        height={"340"}
        backgroundColor={"white"}
        borderRadius="15px"
      >
        <Image
          height="200px"
          width={"100%"}
          objectFit="cover"
          src={
            image_url ||
            "https://e7.pngegg.com/pngimages/81/458/png-clipart-spongebob-squarepants-plankton-s-robotic-revenge-spongebob-squarepants-creature-from-the-krusty-krab-spongebob-s-truth-or-square-plankton-and-karen-mr-krabs-plankton-s-face-leaf-thumbnail.png"
          }
          borderTopRadius="15px"
        />
        <Box height={"70px"}>
          <Text padding={"2"} fontSize="18px">
            {title}
          </Text>
        </Box>
        <Text paddingLeft={"2"} fontWeight="bold" fontSize="15px">
          {category_name}
        </Text>
        <Text paddingLeft={"2"} fontSize="13px">
          {author}
        </Text>
        <Text paddingLeft={"2"} fontSize="13px">
          {publish_date}
        </Text>
      </Box>
      {!authSelector.id ? (
        <>
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            {overlay}
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Box textAlign="center">
                  <Text>You Must Loggin First!</Text>
                </Box>
              </ModalHeader>
              <ModalCloseButton />
              <ModalFooter>
                <Box margin={"auto"}>
                  <Link to="/login">
                    <Button onClick={onClose} bgColor="#43615f" color="white">
                      Login
                    </Button>
                  </Link>
                </Box>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <>
          <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
            {overlay}
            <ModalOverlay />
            <ModalContent h="600px">
              <ModalHeader textAlign={"center"} fontSize="3xl" as={"b"}>
                Details Book
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Grid
                  gridTemplateRows={"50px 2fr 30px"}
                  gridTemplateColumns={"150px 2fr"}
                >
                  <GridItem pl={2}>
                    <Image
                      boxSize="450px"
                      maxWidth={"300px"}
                      src={bookData?.image_url}
                    />
                  </GridItem>
                  <GridItem pl={"30%"}>
                    <Box>
                      <Text fontSize={"xl"} as="b">
                        Title
                      </Text>
                      <Text> {bookData?.title}</Text>
                    </Box>
                    <Box>
                      <Text fontSize={"xl"} as="b">
                        Author
                      </Text>
                      <Text>{bookData?.author}</Text>
                    </Box>
                    <Box>
                      <Text fontSize={"xl"} as="b">
                        Publish Date
                      </Text>
                      <Text>{bookData?.publish_date}</Text>
                    </Box>
                    <Box>
                      <Text fontSize={"xl"} as="b">
                        Genre
                      </Text>
                      <Text>{bookData?.Category?.category_name}</Text>
                    </Box>
                    <Box>
                      <Text fontSize={"xl"} as="b">
                        Description
                      </Text>
                      <Text textAlign="justify">{bookData?.description}</Text>
                    </Box>
                  </GridItem>
                </Grid>
              </ModalBody>

              <ModalFooter>
                <Button
                  size={"sm"}
                  bgColor="#43615f"
                  color="white"
                  onClick={bookBtnHandler}
                >
                  <Text>Add to Cart</Text>
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  )
}

export default Book
