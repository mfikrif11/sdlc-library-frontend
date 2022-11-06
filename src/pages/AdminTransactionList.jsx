import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Grid,
  GridItem,
  Select,
  Text,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { axiosInstance } from "../api"
import AdminTransaction from "../components/AdminTransaction"

const AdminTransactionList = () => {
  const [sortBy, setSortBy] = useState("borrow_date")
  const [sortDir, setSortDir] = useState("DESC")
  const [filter, setFilter] = useState("All")
  const [transaction, setTransaction] = useState([])

  const fetchTransaction = async () => {
    try {
      const response = await axiosInstance.get("/admin/user-transactions?", {
        params: { loan_status: filter, _sortBy: sortBy, _sortDir: sortDir },
      })
      setTransaction(response.data.data)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const renderTransaction = () => {
    return transaction.map((val) => {
      console.log(val.is_penalty)
      return (
        <AdminTransaction
          key={val.id.toString()}
          borrow_date={val.borrow_date}
          due_date={val.due_date}
          loan_status={val.loan_status}
          total_quantity={val.total_quantity}
          total_penalty={val.total_penalty}
          is_penalty={val.is_penalty}
          TransactionItems={val.TransactionItems}
          id={val.id}
          fetchTransaction={fetchTransaction}
          username={val.User.username}
        />
      )
    })
  }

  const sortTransactionHandler = ({ target }) => {
    const { value } = target

    setSortBy(value.split(" ")[0])
    setSortDir(value.split(" ")[1])
  }

  const filterTransactionHandler = ({ target }) => {
    const { value } = target

    setFilter(value)
  }

  useEffect(() => {
    fetchTransaction()
  }, [filter, sortBy, sortDir])
  return (
    <Box bg={"lightgray"} p={"40px"} boxSize={"100%"} mt={"60px"}>
      <Flex pl={"40px"} pt={"40px"} pr={"40px"} direction={"column"}>
        <Box fontSize={"4xl"} fontWeight={"bold"} bg={"white"}>
          <Grid templateColumns={"repeat(3, 1fr)"} pt="20px">
            <GridItem display={"flex"} pl="4" gap={"4"}>
              <Select onChange={filterTransactionHandler}>
                <option value={"All"}>All</option>
                <option value={"Loan returned"}>Loan Return</option>
                <option value={"Waiting for return"}>Waiting For Return</option>
              </Select>

              <Select onChange={sortTransactionHandler}>
                <option value="borrow_date DESC">Latest</option>
                <option value="borrow_date ASC">Old</option>
              </Select>
            </GridItem>
            <GridItem textAlign={"center"}>
              <Text my={"auto"}>Transaction</Text>
            </GridItem>
            <GridItem></GridItem>
          </Grid>

          <Box padding={"4"}>
            {renderTransaction()}
            {!transaction.length ? (
              <Alert
                status="warning"
                bgColor={"#43615f"}
                width="50%"
                justifyContent={"center"}
                mx="auto"
                p="4"
              >
                <AlertIcon />
                <AlertTitle
                  color={"white"}
                  fontWeight="light"
                  fontSize={"18px"}
                >
                  No transactions found
                </AlertTitle>
              </Alert>
            ) : null}
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default AdminTransactionList
