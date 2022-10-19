import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { axiosInstance } from "../api"
import * as Yup from "yup"
import EditBookModal from "../components/EditBookModal"

const AdminDashboard = () => {
  const [books, setBooks] = useState([])
  const [openedDescription, setOpenedDescription] = useState(null)
  const [openedEdit, setOpenedEdit] = useState(null)

  const {
    isOpen: isOpenAddNew,
    onOpen: onOpenAddNew,
    onClose: onCloseAddNew,
  } = useDisclosure()

  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      image_url: "",
      title: "",
      genre: "",
      author: "",
      publish_date: "",
      description: "",
      stock_quantity: "",
    },
    onSubmit: async ({
      image_url,
      title,
      genre,
      author,
      publish_date,
      description,
      stock_quantity,
    }) => {
      try {
        const response = await axiosInstance.post("/admin/books", {
          image_url,
          title,
          genre,
          author,
          publish_date,
          description,
          stock_quantity,
        })

        toast({
          title: "Added New Book",
          description: response.data.message,
          status: "success",
        })
        formik.setFieldValue("image_url", "")
        formik.setFieldValue("title", "")
        formik.setFieldValue("genre", "")
        formik.setFieldValue("author", "")
        formik.setFieldValue("publish_date", "")
        formik.setFieldValue("description", "")
        formik.setFieldValue("stock_quantity", "")
      } catch (err) {
        console.log(err)
        toast({
          title: "Add New Book Failed",
          description: err.response.data.message,
          status: "error",
        })
      }
    },
    validationSchema: Yup.object({
      image_url: Yup.string().required(),
      title: Yup.string().required(),
      genre: Yup.string().required(),
      author: Yup.string().required(),
      publish_date: Yup.string().required(),
      description: Yup.string().required(),
      stock_quantity: Yup.string().required(),
    }),
    validateOnChange: false,
  })

  const editFormik = useFormik({
    initialValues: {
      image_url: "",
      title: "",
      genre: "",
      author: "",
      publish_date: "",
      description: "",
      stock_quantity: "",
    },
    onSubmit: async ({
      image_url,
      title,
      genre,
      author,
      publish_date,
      description,
      stock_quantity,
    }) => {
      try {
        const response = await axiosInstance.patch(
          `/admin/books/${openedEdit.id}`,
          {
            image_url,
            title,
            genre,
            author,
            publish_date,
            description,
            stock_quantity,
          }
        )

        toast({
          title: "Book Edited",
          description: response.data.message,
          status: "success",
        })
        editFormik.setFieldValue("image_url", "")
        editFormik.setFieldValue("title", "")
        editFormik.setFieldValue("genre", "")
        editFormik.setFieldValue("author", "")
        editFormik.setFieldValue("publish_date", "")
        editFormik.setFieldValue("description", "")
        editFormik.setFieldValue("stock_quantity", "")
        setOpenedEdit(null)
      } catch (err) {
        console.log(err)
        toast({
          title: "Failed Edit Book",
          description: err.response.data.message,
          status: "error",
        })
      }
    },
    validationSchema: Yup.object({
      image_url: Yup.string().required(),
      title: Yup.string().required(),
      genre: Yup.string().required(),
      author: Yup.string().required(),
      publish_date: Yup.string().required(),
      description: Yup.string().required(),
      stock_quantity: Yup.string().required(),
    }),
    validateOnChange: false,
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  const editFormChangeHandler = ({ target }) => {
    const { name, value } = target
    editFormik.setFieldValue(name, value)
  }

  const fetchBooks = async () => {
    const maxItemsPerPage = 12

    try {
      const response = await axiosInstance.get(`/books?`, {})
      console.log(response)

      setBooks(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBooksHandler = async (id) => {
    try {
      await axiosInstance.delete(`/admin/books/${id}`)

      fetchBooks()

      toast({
        title: "Book Deleted",
        status: "info",
      })
    } catch (error) {
      console.log(error)
    }
  }

  const renderBooks = () => {
    return books.map((val) => {
      console.log(val)
      return (
        <>
          <Tr height={"200px"}>
            <Td>
              <Image src={val.image_url} />
            </Td>
            <Td>{val.title}</Td>
            <Td>{val.genre}</Td>
            <Td>{val.author}</Td>
            <Td>{val.publish_date}</Td>
            <Td>
              <Button
                onClick={() => setOpenedDescription(val)}
                variant="unstyled"
              >
                Click here to see description
              </Button>
            </Td>
            <Td>{val.stock_quantity}</Td>
            <Td>
              <Box>
                <Box mb={"2"}>
                  <Button
                    bgColor={"green"}
                    color="white"
                    onClick={() => setOpenedEdit(val)}
                  >
                    Edit
                  </Button>
                </Box>
                <Box>
                  <Button
                    bgColor={"red"}
                    color="white"
                    onClick={() => deleteBooksHandler(val.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Td>
          </Tr>
        </>
      )
    })
  }

  useEffect(() => {
    fetchBooks()
  }, [openedEdit])

  useEffect(() => {
    if (openedEdit) {
      editFormik.setFieldValue("image_url", openedEdit.image_url)
      editFormik.setFieldValue("title", openedEdit.title)
      editFormik.setFieldValue("genre", openedEdit.genre)
      editFormik.setFieldValue("author", openedEdit.author)
      editFormik.setFieldValue("publish_date", openedEdit.publish_date)
      editFormik.setFieldValue("description", openedEdit.description)
      editFormik.setFieldValue("stock_quantity", openedEdit.stock_quantity)
    }
  }, [openedEdit])

  return (
    <>
      <Box bg={"lightgrey"} p={"40px"} pt={"65px"}>
        <Grid textAlign={"center"} templateColumns="repeat(3, 1fr)" p="4">
          <GridItem></GridItem>
          <GridItem>
            <Text fontSize={"4xl"} fontWeight="bold">
              Admin Dashboard
            </Text>
          </GridItem>
          <GridItem textAlign={"end"} my="auto">
            <Button
              bgColor={"telegram.500"}
              color="white"
              onClick={onOpenAddNew}
              mr="2"
            >
              Add New Book
            </Button>
            <Button
              bgColor={"telegram.500"}
              color="white"
              onClick={onOpenAddNew}
            >
              Add New Category
            </Button>
          </GridItem>
        </Grid>
        <TableContainer>
          <Table variant="striped" colorScheme="#43615f" bgColor={"white"}>
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Title</Th>
                <Th>Genre</Th>
                <Th>Author</Th>
                <Th>Publish Date</Th>
                <Th>Description</Th>
                <Th>Stock</Th>
                <Th>Option</Th>
              </Tr>
              {renderBooks()}
            </Thead>
          </Table>
        </TableContainer>
      </Box>

      {/* Modal Add New Book*/}
      <Modal
        isOpen={isOpenAddNew}
        onClose={onCloseAddNew}
        motionPreset="slideInBottom"
        size={"lg"}
      >
        <form onSubmit={formik.handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Book</ModalHeader>

            <ModalBody>
              <Grid templateColumns={"repeat(2, 1fr)"} gap="4">
                <GridItem>
                  <FormControl isInvalid={formik.errors.image_url}>
                    <FormLabel>Image Url</FormLabel>
                    <Input
                      name="image_url"
                      type={"text"}
                      onChange={formChangeHandler}
                      value={formik.values.image_url}
                    />
                  </FormControl>
                  <FormControl isInvalid={formik.errors.image_url}>
                    <FormLabel>Title</FormLabel>
                    <Input
                      name="title"
                      type={"text"}
                      onChange={formChangeHandler}
                      value={formik.values.title}
                    />
                  </FormControl>
                  <FormControl isInvalid={formik.errors.genre}>
                    <FormLabel>Genre</FormLabel>
                    <Input
                      name="genre"
                      type={"text"}
                      onChange={formChangeHandler}
                      value={formik.values.genre}
                    />
                  </FormControl>
                  <FormControl isInvalid={formik.errors.author}>
                    <FormLabel>Author</FormLabel>
                    <Input
                      name="author"
                      type={"text"}
                      onChange={formChangeHandler}
                      value={formik.values.author}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isInvalid={formik.errors.publish_date}>
                    <FormLabel>Publish Date</FormLabel>
                    <Input
                      name="publish_date"
                      type={"number"}
                      onChange={formChangeHandler}
                      value={formik.values.publish_date}
                    />
                  </FormControl>
                  <FormControl isInvalid={formik.errors.description}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      resize={"none"}
                      name="description"
                      type={"text"}
                      onChange={formChangeHandler}
                      value={formik.values.description}
                    />
                  </FormControl>
                  <FormControl isInvalid={formik.errors.stock_quantity}>
                    <FormLabel>Stock</FormLabel>
                    <Input
                      name="stock_quantity"
                      type={"number"}
                      onChange={formChangeHandler}
                      value={formik.values.stock_quantity}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onCloseAddNew}>
                Cancel
              </Button>
              <Button
                colorScheme="green"
                mr={3}
                onClick={onCloseAddNew}
                type="submit"
              >
                Add New
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>

      {/* Modal Description */}
      <Modal
        isOpen={openedDescription}
        onClose={() => setOpenedDescription(null)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Description</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{openedDescription?.description}</ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => setOpenedDescription(null)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* modal untuk edit */}
      <Modal isOpen={openedEdit} onClose={() => setOpenedEdit(null)}>
        <ModalContent>
          <ModalHeader>Edit Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={editFormik.errors.image_url}>
              <FormLabel>Image Url</FormLabel>
              <Input
                name="image_url"
                type={"text"}
                onChange={editFormChangeHandler}
                value={editFormik.values.image_url}
              />
            </FormControl>
            <FormControl isInvalid={editFormik.errors.image_url}>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                type={"text"}
                onChange={editFormChangeHandler}
                value={editFormik.values.title}
              />
            </FormControl>
            <FormControl isInvalid={editFormik.errors.genre}>
              <FormLabel>Genre</FormLabel>
              <Input
                name="genre"
                type={"text"}
                onChange={editFormChangeHandler}
                value={editFormik.values.genre}
              />
            </FormControl>
            <FormControl isInvalid={editFormik.errors.author}>
              <FormLabel>Author</FormLabel>
              <Input
                name="author"
                type={"text"}
                onChange={editFormChangeHandler}
                value={editFormik.values.author}
              />
            </FormControl>
            <FormControl isInvalid={editFormik.errors.publish_date}>
              <FormLabel>Publish Date</FormLabel>
              <Input
                name="publish_date"
                type={"number"}
                onChange={editFormChangeHandler}
                value={editFormik.values.publish_date}
              />
            </FormControl>
            <FormControl isInvalid={editFormik.errors.description}>
              <FormLabel>Description</FormLabel>
              <Textarea
                resize={"none"}
                name="description"
                type={"text"}
                onChange={editFormChangeHandler}
                value={editFormik.values.description}
              />
            </FormControl>
            <FormControl isInvalid={editFormik.errors.stock_quantity}>
              <FormLabel>Stock</FormLabel>
              <Input
                name="stock_quantity"
                type={"number"}
                onChange={editFormChangeHandler}
                value={editFormik.values.stock_quantity}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => setOpenedEdit(null)}
            >
              Cancel
            </Button>
            <Button
              colorScheme="green"
              mr={3}
              onClick={() => editFormik.handleSubmit()}
              type="submit"
            >
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AdminDashboard
