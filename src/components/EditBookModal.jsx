// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   Button,
//   useDisclosure,
// } from "@chakra-ui/react"
// import { useFormik } from "formik"

// const EditBookModal = () => {
//   const [{ isOpen, onOpen, onClose: onCloseAddNew }] = useDisclosure()

//   const formik = useFormik({
//     initialValues: {
//       image_url: "",
//       title: "",
//       genre: "",
//       author: "",
//       publish_date: "",
//       description: "",
//       stock_quantity: "",
//     },
//     onSubmit: async ({
//       image_url,
//       title,
//       genre,
//       author,
//       publish_date,
//       description,
//       stock_quantity,
//     }) => {
//       try {
//         const response = await axiosInstance.post(`/admin/books/${id}`, {
//           image_url,
//           title,
//           genre,
//           author,
//           publish_date,
//           description,
//           stock_quantity,
//         })

//         toast({
//           title: "Added New Book",
//           description: response.data.message,
//           status: "success",
//         })
//         formik.setFieldValue("image_url", "")
//         formik.setFieldValue("title", "")
//         formik.setFieldValue("genre", "")
//         formik.setFieldValue("author", "")
//         formik.setFieldValue("publish_date", "")
//         formik.setFieldValue("description", "")
//         formik.setFieldValue("stock_quantity", "")
//       } catch (err) {
//         console.log(err)
//         toast({
//           title: "Add New Book Failed",
//           description: err.response.data.message,
//           status: "error",
//         })
//       }
//     },
//     validationSchema: Yup.object({
//       image_url: Yup.string().required(),
//       title: Yup.string().required(),
//       genre: Yup.string().required(),
//       author: Yup.string().required(),
//       publish_date: Yup.string().required(),
//       description: Yup.string().required(),
//       stock_quantity: Yup.string().required(),
//     }),
//     validateOnChange: false,
//   })

//   return (
//     <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
//       <ModalContent>
//         <ModalHeader>Edit Book</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <FormControl isInvalid={formik.errors.image_url}>
//             <FormLabel>Image Url</FormLabel>
//             <Input
//               name="image_url"
//               type={"text"}
//               onChange={formChangeHandler}
//               value={formik.values.image_url}
//             />
//           </FormControl>
//           <FormControl isInvalid={formik.errors.image_url}>
//             <FormLabel>Title</FormLabel>
//             <Input
//               name="title"
//               type={"text"}
//               onChange={formChangeHandler}
//               value={formik.values.title}
//             />
//           </FormControl>
//           <FormControl isInvalid={formik.errors.genre}>
//             <FormLabel>Genre</FormLabel>
//             <Input
//               name="genre"
//               type={"text"}
//               onChange={formChangeHandler}
//               value={formik.values.genre}
//             />
//           </FormControl>
//           <FormControl isInvalid={formik.errors.author}>
//             <FormLabel>Author</FormLabel>
//             <Input
//               name="author"
//               type={"text"}
//               onChange={formChangeHandler}
//               value={formik.values.author}
//             />
//           </FormControl>
//           <FormControl isInvalid={formik.errors.publish_date}>
//             <FormLabel>Publish Date</FormLabel>
//             <Input
//               name="publish_date"
//               type={"number"}
//               onChange={formChangeHandler}
//               value={formik.values.publish_date}
//             />
//           </FormControl>
//           <FormControl isInvalid={formik.errors.description}>
//             <FormLabel>Description</FormLabel>
//             <Input
//               name="description"
//               type={"text"}
//               onChange={formChangeHandler}
//               value={formik.values.description}
//             />
//           </FormControl>
//           <FormControl isInvalid={formik.errors.stock_quantity}>
//             <FormLabel>Stock</FormLabel>
//             <Input
//               name="stock_quantity"
//               type={"number"}
//               onChange={formChangeHandler}
//               value={formik.values.stock_quantity}
//             />
//           </FormControl>
//         </ModalBody>

//         <ModalFooter>
//           <Button colorScheme="red" mr={3} onClick={onCloseAddNew}>
//             Cancel
//           </Button>
//           <Button
//             colorScheme="green"
//             mr={3}
//             onClick={onCloseAddNew}
//             type="submit"
//           >
//             Edit
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   )
// }

// export default EditBookModal
