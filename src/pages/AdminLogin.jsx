import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { axiosInstance } from "../api"
import { useDispatch } from "react-redux"
import { login } from "../redux/features/authSlice"
import planktonLaugh from "../assets/planktonhaha.png"

const LoginPage = () => {
  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },
    onSubmit: async ({ usernameOrEmail, password }) => {
      try {
        const response = await axiosInstance.post("/admin/login", {
          usernameOrEmail,
          password,
        })
        toast({
          title: "login successful",
          status: "success",
          description: response.data.message,
        })

        localStorage.setItem("auth_token", response.data.token)
        dispatch(
          login({
            username: response.data.data.username,
            email: response.data.data.email,
            id: response.data.data.id,
            NIM: response.data.data.NIM,
            is_admin: response.data.data.is_admin,
          })
        )

        navigate("/admin/dashboard")
        formik.setFieldValue("usernameOrEmail", "")
        formik.setFieldValue("password", "")
      } catch (err) {
        console.log(err)
        toast({
          title: "login failed",
          status: "error",
          description: err.response.data.message,
        })
      }
    },
    validationSchema: Yup.object({
      usernameOrEmail: Yup.string().required(
        "username or email is required field"
      ),
      password: Yup.string().required(),
    }),
    validateOnChange: false,
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  return (
    <Box bg={"lightgrey"} pr={"40px"} pl={"40px"} pt={"100px"} pb={"40px"}>
      <Flex
        direction={{
          base: "column",
          md: "column",
          lg: "row",
        }}
      >
        {/* nanti tambahin direction */}
        {/* di set responsivenya */}
        <Box flex="1" bg={"white"}>
          <Image
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80"
            height={"100%"}
            alt={"library"}
          />
        </Box>
        <Box flex="1" bg="white">
          <Text
            fontWeight={"700"}
            fontSize={"2.25rem"}
            textAlign={"center"}
            mt={"30px"}
          >
            Hello Admin!
          </Text>
          <Box pr={"40px"} pl={"40px"} mt={{ lg: "100px" }} mb={"30px"}>
            {/* form */}
            <form onSubmit={formik.handleSubmit}>
              <FormControl
                mt={"10px"}
                isInvalid={formik.errors.usernameOrEmail}
              >
                <FormLabel>Username or Email</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your username or email"
                  value={formik.values.usernameOrEmail}
                  name="usernameOrEmail"
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>
                  {formik.errors.usernameOrEmail}
                </FormErrorMessage>
              </FormControl>
              <FormControl mt={"10px"} isInvalid={formik.errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={formChangeHandler}
                    value={formik.values.password}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      size="sm"
                      bg={"#1b3c4b"}
                      onClick={togglePassword}
                      color={"white"}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Button
                mt={"15px"}
                width={"100%"}
                bg={"#1b3c4b"}
                color={"white"}
                type="submit"
              >
                Login
              </Button>
            </form>
            {/* form */}
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default LoginPage
