import { Box, Text } from "@chakra-ui/react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

const App = () => {
  return (
    <>
      <Box>
        <Text>NAVBAR</Text>
      </Box>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default App;
