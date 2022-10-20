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
  Image,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GuestRoute from "../pages/GuestRoute";
import ProtectedRoute from "../pages/ProtectedRoute";
import { logout } from "../redux/features/authSlice";
import { AiFillDatabase, AiOutlineShoppingCart } from "react-icons/ai";
import chumBucket from "../assets/cumbucket.jpg";
import { BiBookReader } from "react-icons/bi";
import { useEffect } from "react";
import { axiosInstance } from "../api";
import { fillCart } from "../redux/features/cartSlice";

const Navbar = () => {
  const authSelector = useSelector((state) => state.auth);
  const cartSelector = useSelector((state) => state.cart);

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

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get("/carts");

      dispatch(fillCart(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <Box
      backgroundColor={"#43615f"}
      color="white"
      top={"0"}
      right={"0"}
      left="0"
      zIndex={"999"}
      position="fixed"
      height={"72px"}
    >
      {/* menu bar di HP */}
      <Flex flex={1}>
        <Box
          flex={1}
          display={{
            lg: "none",
          }}
        >
          <Box textAlign={"left"} padding={"4"} fontSize={"2xl"}>
            {authSelector.username ? (
              <>
                <Box display={"flex"}>
                  <Text
                    fontSize={{ base: "smaller" }}
                    marginTop={{ base: "5px" }}
                  >
                    Hi, {authSelector.username}!
                  </Text>
                  {/* btn cart */}
                  {location.pathname === "/cart" ? null : (
                    <Link to={"/cart"}>
                      <Button
                        bgColor={"#1b3c4b"}
                        fontSize={"2xl"}
                        ml={"10px"}
                        _hover={"none"}
                        _active={"none"}
                      >
                        <AiOutlineShoppingCart />
                        <Box
                          fontSize={"smaller"}
                          backgroundColor={"#43615f"}
                          borderRadius={"50%"}
                          _hover={"active"}
                          ml={"4px"}
                          pt={"1px"}
                          pr={"10px"}
                          pb={"2px"}
                          pl={"8px"}
                        >
                          1
                        </Box>
                      </Button>
                    </Link>
                  )}
                  {location.pathname === "/transaction" ? null : (
                    <Link to="/transaction">
                      <Button
                        bgColor={"#1b3c4b"}
                        fontSize={"2xl"}
                        _hover={"none"}
                        _active={"none"}
                        ml={"10px"}
                      >
                        <BiBookReader />
                        <Box
                          fontSize={"smaller"}
                          backgroundColor={"red.500"}
                          borderRadius={"50%"}
                          ml={"4px"}
                          pt={"1px"}
                          pr={"10px"}
                          pb={"2px"}
                          pl={"8px"}
                        >
                          !
                        </Box>
                      </Button>
                    </Link>
                  )}
                  {/* btn cart */}
                </Box>
              </>
            ) : (
              <Link to="/">
                <Text>ChumBucket</Text>
              </Link>
            )}
          </Box>
        </Box>
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
              ) : location.pathname === "/login" ? (
                <Link to={"/register"}>
                  <MenuItem>Register</MenuItem>
                </Link>
              ) : (
                <Link to={"/login"}>
                  <MenuItem>Login</MenuItem>
                </Link>
              )}
            </MenuList>
          </Portal>
        </Menu>
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
            // btncart
            location.pathname === "/cart" ? null : (
              <Link to="/cart">
                <Button
                  bgColor={"#1b3c4b"}
                  fontSize={"2xl"}
                  _hover={"none"}
                  _active={"none"}
                >
                  <AiOutlineShoppingCart />

                  {cartSelector.data.length ? (
                    <Box
                      fontSize={"smaller"}
                      backgroundColor={"#43615f"}
                      borderRadius={"50%"}
                      ml={"4px"}
                      pt={"1px"}
                      pr={"10px"}
                      pb={"2px"}
                      pl={"8px"}
                    >
                      {cartSelector.data.length}
                    </Box>
                  ) : null}
                </Button>
              </Link>
            )
          ) : // btncart
          null}
          {authSelector.username ? (
            <>
              {location.pathname === "/transaction" ? null : (
                <Link to="/transaction">
                  <Button
                    bgColor={"#1b3c4b"}
                    fontSize={"2xl"}
                    _hover={"none"}
                    _active={"none"}
                  >
                    <BiBookReader />
                    <Box
                      fontSize={"smaller"}
                      backgroundColor={"red.500"}
                      borderRadius={"50%"}
                      ml={"4px"}
                      pt={"1px"}
                      pr={"10px"}
                      pb={"2px"}
                      pl={"8px"}
                    >
                      !
                    </Box>
                  </Button>
                </Link>
              )}

              <Button
                bgColor={"red.500"}
                onClick={logoutBtnHandler}
                _hover={"none"}
                _active={"none"}
              >
                Logout
              </Button>
            </>
          ) : location.pathname === "/login" ||
            location.pathname === "/register" ||
            location.pathname === "/admin/login" ? null : (
            <Link to={"/login"}>
              <Button bgColor={"#1b3c4b"} _hover={"none"} _active={"none"}>
                Login
              </Button>
            </Link>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Navbar;
