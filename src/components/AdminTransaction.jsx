import { Box, Button, Grid, GridItem, Text, useToast } from "@chakra-ui/react"

import { axiosInstance } from "../api"
import AdminTransactionItem from "./AdminTransactionItem"

const AdminTransaction = ({
  borrow_date,
  due_date,
  loan_status,
  TransactionItems,
  total_quantity,
  total_penalty,
  id,
  fetchTransaction,
  is_penalty,
  username,
}) => {
  const toast = useToast()

  const returnTransactionItem = async () => {
    try {
      const a = {
        loan_status: "Loan returned",
      }
      await axiosInstance.patch(`/transactions/returnStatus/${id}`, a)
      fetchTransaction()

      toast({
        title: "Loan Returned",
        status: "success",
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Return Error",
        status: "error",
      })
    }
  }

  const renderTransactionItem = () => {
    return TransactionItems.map((val) => {
      return (
        <AdminTransactionItem
          key={val.id.toString()}
          title={val.Book.title}
          author={val.Book.author}
          category_name={val.Book.Category.category_name}
          publish_date={val.Book.publish_date}
          image_url={val.Book.image_url}
        />
      )
    })
  }

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
                Username
              </Text>

              <Text>{username}</Text>

              <Text fontWeight={"light"} fontSize="19px">
                Borrow Date
              </Text>

              <Text>{borrow_date}</Text>

              <Text fontWeight={"light"} fontSize="19px">
                Due Date
              </Text>

              <Text>{due_date}</Text>
            </Box>

            <Box mx={"auto"} my="auto">
              <Text fontWeight={"light"} fontSize="19px">
                Loan Status
              </Text>

              <Text>
                {loan_status === "Loan returned" ? (
                  <Text color={"green"}>Loan returned</Text>
                ) : null}
                {loan_status === "Waiting for return" ? (
                  <Text color={"red"}>Waiting for return</Text>
                ) : null}
              </Text>

              <Text fontWeight={"light"} fontSize="19px">
                Total Quantity
              </Text>

              <Text>{total_quantity}</Text>
              {is_penalty ? (
                <>
                  <Text fontWeight={"light"} fontSize="19px">
                    Total Penalty
                  </Text>

                  <Text>Rp. {total_penalty.toLocaleString()}</Text>
                </>
              ) : null}
            </Box>
          </Box>
        </Grid>
      </Box>
    </>
  )
}

export default AdminTransaction
