import { Box, Button, Grid, GridItem, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import { axiosInstance } from "../api"
import TransactionItem from "./TransactionItem"

const Transaction = ({
  borrow_date,
  due_date,
  loan_status,
  TransactionItems,
  total_quantity,
}) => {
  //   const [returnBook, setReturnBook] = useState("")

  //   const returnTransactionItem = async () => {
  //     try {
  //       const response = await axiosInstance.patch("/returnStatus/:id", {})
  //       setTransactionItem(response.data.data)
  //       console.log(response)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  const renderTransactionItem = () => {
    return TransactionItems.map((val) => {
      return (
        <TransactionItem
          key={val.id.toString()}
          title={val.Book.title}
          author={val.Book.author}
          genre={val.Book.genre}
          publish_date={val.Book.publish_date}
          image_url={val.Book.image_url}
        />
      )
    })
  }

  //   const returnBookHandler = ({ target }) => {
  //     const { value } = target
  //     setReturnBook(value)
  //   }

  //   useEffect(() => {
  //     fetchTransactionItem()
  //   }, [])
  //   useEffect(() => {
  //     returnTransactionItem()
  //   }, [returnBook])
  return (
    <>
      <Box bgColor={"lightgray"} p={"4"} borderRadius="15px" mb="4">
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            lg: "repeat(2, 1fr)",
          }}
          gap={4}
        >
          <GridItem width={"100%"}>{renderTransactionItem()}</GridItem>

          <Box
            height={"auto"}
            backgroundColor={"white"}
            borderRadius="15px"
            display={{ base: "block", md: "flex", lg: "flex" }}
            p={"4"}
            fontSize={"14px"}
          >
            <Box mx={"auto"} my="auto">
              <Text fontWeight={"light"} fontSize="19px">
                Borrow Date
              </Text>
              <Text>{borrow_date || "123123"}</Text>
              <Text fontWeight={"light"} fontSize="19px">
                Due Date
              </Text>
              <Text>{due_date || "chuaks"}</Text>
            </Box>
            <Box mx={"auto"} my="auto">
              <Text fontWeight={"light"} fontSize="19px">
                Loan Status
              </Text>
              <Text>{loan_status}</Text>
              <Text fontWeight={"light"} fontSize="19px">
                Total Quantity
              </Text>
              <Text>{total_quantity}</Text>
            </Box>
          </Box>
        </Grid>
        <Box>
          <Button
            bgColor={"#43615f"}
            color="white"
            justifyContent={"end"}
            value="Loan returned"
            // onClick={returnBookHandler}
          >
            Return
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default Transaction
