import {
  Box,
  Button,
  Image,
  Table,
  TableContainer,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"

import { useEffect, useState } from "react"
import { axiosInstance } from "../api"

const AdminTransaction = () => {
  const [transaction, setTransaction] = useState([])
  const fetchTransaction = async () => {
    try {
      const response = await axiosInstance.get("/admin/user-transactions")
      setTransaction(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderTransaction = () => {
    return transaction.map((val) => {
      return (
        <Tr height={"200px"}>
          <Td>{val.UserId}</Td>
          <Td>{val.title}</Td>
          <Td>{val.genre}</Td>
          <Td>{val.author}</Td>
          <Td>{val.publish_date}</Td>
          <Td>
            <Button
              //   onClick={() => setOpenedDescription(val)}
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
                  //   onClick={() => setOpenedEdit(val)}
                >
                  Edit
                </Button>
              </Box>
              <Box>
                <Button
                  bgColor={"red"}
                  color="white"
                  //   onClick={() => deleteBooksHandler(val.id)}
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
    fetchTransaction()
  }, [])
  return (
    <Box bg={"lightgrey"} p={"40px"} pt={"65px"}>
      <TableContainer>
        <Table variant="striped" colorScheme="#43615f" bgColor={"white"}>
          <Thead>
            <Tr>
              <Th>UserID</Th>
              <Th>Title</Th>
              <Th>Genre</Th>
              <Th>Author</Th>
              <Th>Publish Date</Th>
              <Th>Description</Th>
              <Th>Stock</Th>
              <Th>Option</Th>
            </Tr>
            {renderTransaction()}
          </Thead>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default AdminTransaction
