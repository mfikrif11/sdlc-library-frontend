import { Box, Grid, GridItem, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <Box
      backgroundColor={"#43615f"}
      color="white"
      top={"0"}
      right={"0"}
      left="0"
      zIndex={"999"}
      position="fixed"
    >
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem />
        <GridItem display={"flex"} justifyContent={"center"}>
          <Text fontSize={"4xl"} padding={"2"}>
            ChumBucket
          </Text>
        </GridItem>
        <GridItem
          display={"flex"}
          justifyContent={"end"}
          gap="4"
          padding="2"
          my={"auto"}
        >
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default Navbar
