import { Box, Text } from "@chakra-ui/react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
           <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
