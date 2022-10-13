import { Box, Text } from "@chakra-ui/react"
import { Route, Router, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"

const App = () => {
  return (
    <>
      <Box>
        {/* #43615f hero color*/}
        <Navbar />
      </Box>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" />
        <Route path="/register" />
      </Routes>
    </>
  )
}

export default App
