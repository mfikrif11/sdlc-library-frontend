import {
  Box,
  Button,
  Grid,
  GridItem,
  Text,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Portal,
  Flex,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GuestRoute from "../pages/GuestRoute";
import ProtectedRoute from "../pages/ProtectedRoute";
import { logout } from "../redux/features/authSlice";
import { AiFillDatabase } from "react-icons/ai";

const Navbar = () => {
  const authSelector = useSelector((state) => state.auth);

  const location = useLocation();
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const logoutBtnHandler = () => {
    localStorage.removeItem("auth_token");
    dispatch(logout());
    toast({
      title: "User Logout",
      status: "info",
    });
    navigate("/");
  };

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
      {/* menu bar di HP */}
      <Flex flex={1}>
        <Menu>
          <MenuButton
            display={{
              lg: "none",
            }}
            padding={"4"}
            fontSize={"4xl"}
          >
            <AiFillDatabase />
          </MenuButton>
          <Portal>
            <MenuList>
              <Link to={"/"}>
                <MenuItem>Home</MenuItem>
              </Link>

              {authSelector.username ? (
                <MenuItem onClick={logoutBtnHandler}>Logout</MenuItem>
              ) : (
                <Link to={"/login"}>
                  <MenuItem>Login</MenuItem>
                </Link>
              )}
            </MenuList>
          </Portal>
        </Menu>
        <Box
          flex={1}
          display={{
            lg: "none",
          }}
        >
          <Text textAlign={"right"} padding={"4"} fontSize={"2xl"}>
            {authSelector.username}
          </Text>
        </Box>
      </Flex>

      {/* menu bar di laptop */}
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={6}
        display={{ base: "none", lg: "grid" }}
      >
        <GridItem>
          <Box fontSize={"2xl"} padding={"4"}>
            {authSelector.username ? `Hi, ${authSelector.username}!` : null}
          </Box>
        </GridItem>
        <GridItem display={"flex"} justifyContent={"center"}>
          <Link to={"/"}>
            <Text fontSize={"4xl"} padding={"2"}>
              ChumBucket
            </Text>
          </Link>
        </GridItem>
        <GridItem
          display={"flex"}
          justifyContent={"end"}
          gap="4"
          padding="2"
          my={"auto"}
        >
          {authSelector.username ? (
            <Button bgColor={"red.500"} onClick={logoutBtnHandler}>
              Logout
            </Button>
          ) : location.pathname === "/login" ||
            location.pathname === "/register" ? null : (
            <Link to={"/login"}>
              <Button bgColor={"#1b3c4b"}>Login</Button>
            </Link>
          )}
          {/* <Link to={"/register"}>Register</Link> */}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Navbar;
