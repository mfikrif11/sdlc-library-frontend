import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
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

const AdminDashboard = () => {
  const [books, setBooks] = useState([])
  const [openedDescription, setOpenedDescription] = useState(null)
  const [openedEdit, setOpenedEdit] = useState(null)
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  const [sortBy, setSortBy] = useState("title")
  const [sortDir, setSortDir] = useState("ASC")
  const [filter, setFilter] = useState(0)
  const [currentSearch, setCurrentSearch] = useState("")

  const {
    isOpen: isOpenAddNewBook,
    onOpen: onOpenAddNewBook,
    onClose: onCloseAddNewBook,
  } = useDisclosure()

  const toast = useToast()

  const searchFormik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: ({ search }) => {
      setCurrentSearch(search)
      setPage(1)
    },
  })

  const formik = useFormik({
    initialValues: {
      image_url: "",
      title: "",
      CategoryId: "",
      author: "",
      publish_date: "",
      description: "",
      stock_quantity: "",
    },
    onSubmit: async ({
      image_url,
      title,
      CategoryId,
      author,
      publish_date,
      description,
      stock_quantity,
    }) => {
      try {
        const response = await axiosInstance.post("/admin/books", {
          image_url,
          title,
          CategoryId,
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
        formik.setFieldValue("CategoryId", "")
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
      CategoryId: Yup.string().required(),
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
      CategoryId: "",
      author: "",
      publish_date: "",
      description: "",
      stock_quantity: "",
    },
    onSubmit: async ({
      image_url,
      title,
      CategoryId,
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
            CategoryId,
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
        editFormik.setFieldValue("CategoryId", "")
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
    // console.log(name, value)
    formik.setFieldValue(name, value)
    // console.log(formik.values)
  }

  const searchChangeHandler = ({ target }) => {
    const { name, value } = target

    searchFormik.setFieldValue(name, value)
  }

  const editFormChangeHandler = ({ target }) => {
    const { name, value } = target
    editFormik.setFieldValue(name, value)
  }

  const fetchBooks = async () => {
    const maxItemsPerPage = 12

    try {
      const response = await axiosInstance.get(`/books?`, {
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

  const sortBookHandler = ({ target }) => {
    const { value } = target

    setSortBy(value.split(" ")[0])
    setSortDir(value.split(" ")[1])
  }

  const filterBookHandler = ({ target }) => {
    const { value } = target

    setFilter(value)
  }

  const seeMoreBtnHandler = () => {
    setPage(page + 1)
  }

  const previouspage = () => {
    setPage(page - 1)
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
        <Tr height={"200px"}>
          <Td>
            <Image src={val.image_url} />
          </Td>
          <Td>{val.title}</Td>
          <Td>{val.Category.category_name}</Td>
          <Td>{val.author}</Td>
          <Td>{val.publish_date}</Td>
          <Td>
            <Button
              onClick={() => setOpenedDescription(val)}
              variant="unstyled"
            >
              Click here to <br /> see description
            </Button>
          </Td>
          <Td>{val.stock_quantity}</Td>
          <Td>
            <Box>
              <Box mb={"2"}>
                <Button
                  width={"100px"}
                  colorScheme={"green"}
                  color="white"
                  onClick={() => setOpenedEdit(val)}
                >
                  Edit
                </Button>
              </Box>
              <Box>
                <Button
                  width={"100px"}
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
      )
    })
  }

  useEffect(() => {
    fetchBooks()
  }, [openedEdit, page, sortBy, sortDir, filter, currentSearch])

  useEffect(() => {
    if (openedEdit) {
      editFormik.setFieldValue("image_url", openedEdit.image_url)
      editFormik.setFieldValue("title", openedEdit.title)
      editFormik.setFieldValue("genre", openedEdit.CategoryId)
      editFormik.setFieldValue("author", openedEdit.author)
      editFormik.setFieldValue("publish_date", openedEdit.publish_date)
      editFormik.setFieldValue("description", openedEdit.description)
      editFormik.setFieldValue("stock_quantity", openedEdit.stock_quantity)
    }
  }, [openedEdit])

  return (
    <>
      <Box bg={"lightgrey"} p={"40px"} pt={"65px"}>
        <Grid textAlign={"center"} templateColumns="1fr .7fr 1fr" p="6">
          <GridItem>
            <Box mt="12px" display={"flex"} marginX="auto" gap={2}>
              <Select onChange={filterBookHandler}>
                <option value={0}>All</option>
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

              <Select onChange={sortBookHandler}>
                <option value="title ASC">A - Z</option>
                <option value="title DESC">Z - A</option>
                <option value="publish_date DESC">Latest</option>
                <option value="publish_date ASC">Old</option>
              </Select>

              <form onSubmit={searchFormik.handleSubmit}>
                <FormControl isInvalid={formik.errors.search} display="flex">
                  <Input
                    placeholder="Search"
                    name="search"
                    width={"150px"}
                    value={searchFormik.values.search}
                    onChange={searchChangeHandler}
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
          </GridItem>
          <GridItem>
            <Text fontSize={"4xl"} fontWeight="bold">
              Admin Dashboard
            </Text>
          </GridItem>
          <GridItem textAlign={"end"} my="auto">
            <Button
              bgColor={"telegram.500"}
              color="white"
              onClick={onOpenAddNewBook}
              mr="2"
            >
              Add New Book
            </Button>
          </GridItem>
        </Grid>
        <TableContainer borderRadius={"15px"}>
          <Table variant="unstyled" colorScheme="#43615f" bgColor={"white"}>
            <Thead>
              <Tr>
                <Th w={"180px"}>Image</Th>
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
        <HStack justifyContent={"end"} gap="2px" mt={"4"}>
          {page === 1 ? null : (
            <Button bgColor={"#43615f"} onClick={previouspage} color="white">
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
      </Box>

      {/* Modal Add New Book*/}
      <Modal
        isOpen={isOpenAddNewBook}
        onClose={onCloseAddNewBook}
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
                    <Select name="CategoryId" onChange={formChangeHandler}>
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
              <Button colorScheme="red" mr={3} onClick={onCloseAddNewBook}>
                Cancel
              </Button>
              <Button
                colorScheme="green"
                mr={3}
                onClick={onCloseAddNewBook}
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
              <Select
                name="CategoryId"
                onChange={editFormChangeHandler}
                // defaultValue={openedEdit.image_url}
              >
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
