import { Alert, AlertIcon, AlertTitle, Box, Flex, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { axiosInstance } from "../api"
import Transaction from "../components/Transaction"

const TransactionList = () => {
  const [transaction, setTransaction] = useState([])

  const fetchTransaction = async () => {
    try {
      const response = await axiosInstance.get("/transactions/me", {
        params: { _sortDir: "DESC" },
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
        <Transaction
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
        />
      )
    })
  }

  useEffect(() => {
    fetchTransaction()
  }, [])
  return (
    <Box bg={"lightgray"} p={"40px"} boxSize={"100%"} mt={"60px"}>
      <Flex pl={"40px"} pt={"40px"} pr={"40px"} direction={"column"}>
        <Box fontSize={"4xl"} fontWeight={"bold"} bg={"white"}>
          <Text pl={"40px"} mt={"40px"}>
            Transaction
          </Text>

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

export default TransactionList
