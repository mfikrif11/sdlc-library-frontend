import { Box, Text } from "@chakra-ui/react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/features/authSlice";
import { axiosInstance } from "./api";
import GuestRoute from "./pages/GuestRoute";
import CartPage from "./pages/CartPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import TransactionList from "./pages/TransactionList";


const App = () => {
    const [authCheck, setAuthCheck] = useState(false)
    const dispatch = useDispatch()
  const keepUserLoggedIn = async () => {
    try {
            const auth_token = localStorage.getItem("auth_token")

            if (!auth_token) {
                setAuthCheck(true)
                return
            }

            const response = await axiosInstance.get("/auth/refresh-token")
      dispatch(login(response.data.data));
      localStorage.setItem("auth_token", response.data.token);
    } catch (err) {
      console.log(err);
    } finally {
      setAuthCheck(true);
    }
   }

    useEffect(() => {
        keepUserLoggedIn()
    }, [])

    if (!authCheck) {
        return <div>Loading...</div>
    }

  return (
    <>
      <Box>
        {/* #43615f hero color*/}
        <Navbar />
      </Box>

      <Routes>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transaction"
          element={
            <ProtectedRoute>
              <TransactionList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;