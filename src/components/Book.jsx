import {
    Box,
    Button,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react"
import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import { axiosInstance } from "../api"
import { useSelector, useDispatch } from "react-redux"
import { details } from "../redux/features/bookSlice"

const Book = ({ image_url, title, author, publish_date, genre }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const params = useParams()
    const [data, setData] = useState()
    const authSelector = useSelector((state) => state.book)
    const dispatch = useDispatch()

    const fetchPost = async () => {
        try {
            const book = await axiosInstance.get("/books")
            console.log(book)

            const bookId = data.data.data.filter((val) => {
                return val.id == params.id
            })

            console.log(bookId)

            const response = await axiosInstance.get(`/books/${bookId[0].id}`)
            console.log(response.data.data)

            setData(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Link onClick={onOpen}>
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
                    {genre}
                </Text>
                <Text paddingLeft={"2"} fontSize="13px">
                    {author}
                </Text>
                <Text paddingLeft={"2"} fontSize="13px">
                    {publish_date}
                </Text>
            </Box>
            <>
                {/* <Button onClick={onOpen}>Open Modal</Button> */}
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Detail Book</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>{fetchPost}</ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button bgColor="#43615f" color="white">
                                Add to Cart
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        </Link>
    )
}

export default Book
