import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Square,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { axiosInstance } from "../api";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      username: "",
      NIM: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ username, NIM, email, password }) => {
      try {
        const response = await axiosInstance.post("/auth/register", {
          username,
          NIM,
          email,
          password,
        });

        toast({
          title: "Registration Successful",
          description: response.data.message,
          status: "success",
        });
        formik.setFieldValue("username", "");
        formik.setFieldValue("NIM", "");
        formik.setFieldValue("email", "");
        formik.setFieldValue("password", "");
        navigate("/login");
      } catch (err) {
        // ini pake trycatch biar langsung berhubungan dengan backend
        console.log(err.response);
        toast({
          title: "Registration Failed",
          description: err.response.data.message,
          status: "error",
        });
      }
    },
    validationSchema: Yup.object({
      username: Yup.string().required().min(3),
      NIM: Yup.number().required(),
      email: Yup.string().required().email(),
      password: Yup.string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    validateOnChange: false,
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

  return (
    <>
      <Box pr={"40px"} pl={"40px"} pt={"100px"} pb={"40px"} bg={"lightgrey"}>
        <Flex
          direction={{
            base: "column",
            md: "column",
            lg: "row",
          }}
        >
          {/* nanti tambahin direction */}
          {/* di set responsivenya */}
          <Box flex="1">
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
              // di set responsivenya
              textAlign={"center"}
              mt={"30px"}
            >
              Hello Readers!
            </Text>
            {/* form */}
            <Box pr={"40px"} pl={"40px"} mt={"40px"} mb={"25px"}>
              <form onSubmit={formik.handleSubmit}>
                <FormControl isInvalid={formik.errors.username}>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    value={formik.values.username}
                    name="username"
                    onChange={formChangeHandler}
                  />
                  <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                </FormControl>
                <FormControl mt={"10px"} isInvalid={formik.errors.NIM}>
                  <FormLabel>NIM</FormLabel>
                  <Input
                    type="number"
                    placeholder="Enter your NIM"
                    value={formik.values.NIM}
                    name="NIM"
                    onChange={formChangeHandler}
                  />
                  <FormErrorMessage>{formik.errors.NIM}</FormErrorMessage>
                </FormControl>
                <FormControl mt={"10px"} isInvalid={formik.errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formik.values.email}
                    name="email"
                    onChange={formChangeHandler}
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.errors.password} mt={"10px"}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      onChange={formChangeHandler}
                      value={formik.values.password}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="enter your password"
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
                  Register
                </Button>
                {/* form */}
                <Box textAlign={"right"}>
                  <Link to={"/login"}>
                    <Text fontSize={"smaller"} mt={"10px"}>
                      Already Have an Account?
                    </Text>
                  </Link>
                </Box>
              </form>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default RegisterPage;
