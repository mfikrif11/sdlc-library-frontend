import { Box, Flex, Image, Spinner, Text } from "@chakra-ui/react"
import { Routes, Route, Link, useLocation } from "react-router-dom"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "./redux/features/authSlice"
import { axiosInstance } from "./api"
import GuestRoute from "./pages/GuestRoute"
import CartPage from "./pages/CartPage"
import ProtectedRoute from "./pages/ProtectedRoute"
import TransactionList from "./pages/TransactionList"
import loadingImage from "./assets/planktonhaha.png"
import AdminLogin from "./pages/AdminLogin"
import NavbarAdmin from "./components/NavbarAdmin"
import AdminDashboard from "./pages/AdminDashboard"

import AdminTransactionList from "./pages/AdminTransactionList"
import AdminCategory from "./pages/AdminCategory"

const App = () => {
  const [authCheck, setAuthCheck] = useState(false)
  const dispatch = useDispatch()
  const authSelector = useSelector((state) => state.auth)

  console.log(authSelector)

  const location = useLocation()

  const keepUserLoggedIn = async () => {
    try {
      const auth_token = localStorage.getItem("auth_token")

      if (!auth_token) {
        setAuthCheck(true)
        return
      }

      const response = await axiosInstance.get("/auth/refresh-token")
      console.log(response)
      dispatch(login(response.data.data))
      localStorage.setItem("auth_token", response.data.token)
      setAuthCheck(true)
    } catch (err) {
      console.log(err)
      setAuthCheck(true)
    } finally {
      setAuthCheck(true)
    }
  }

  useEffect(() => {
    keepUserLoggedIn()
  }, [])

  if (!authCheck) {
    return (
      <Box textAlign={"center"}>
        <Box mt={"220px"}>
          <Flex justifyContent={"center"}>
            <Image display={"block"} src={loadingImage} width="200px" />
          </Flex>
          <Text p="4" fontWeight={"light"} fontSize="4xl">
            Chumbucket
          </Text>
          <Spinner
            thickness="3px"
            speed="0.7s"
            emptyColor="gray.200"
            color="#43615f"
            size="xl"
          />
        </Box>
      </Box>
      // <div>Loading...</div>
    )
  }

  return (
    <>
      {authSelector.is_admin ? (
        <Box>
          <NavbarAdmin />
        </Box>
      ) : (
        <Box>
          <Navbar />
        </Box>
      )}

      {/* <Box>
        <Navbar />
      </Box> */}

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
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/transaction" element={<AdminTransactionList />} />
        <Route path="/admin/category" element={<AdminCategory />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </>
  )
}

export default App
