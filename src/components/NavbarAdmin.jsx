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
  Portal,
  Flex,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../redux/features/authSlice";
import { AiFillDatabase, AiOutlineShoppingCart } from "react-icons/ai";
import { BiBookReader } from "react-icons/bi";

const NavbarAdmin = () => {
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
      title: "Admin Logout",
      status: "info",
    });
    navigate("/admin/login");
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
                  {location.pathname === "/admin/transaction" ? null : (
                    <Link to="/admin/transaction">
                      <Button
                        bgColor={"#1b3c4b"}
                        fontSize={"2xl"}
                        _hover={"none"}
                        _active={"none"}
                        ml={"10px"}
                      >
                        <BiBookReader />
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
              <Link to={"/admin/dashboard"}>
                <MenuItem>Home</MenuItem>
              </Link>
              <MenuItem onClick={logoutBtnHandler}>Logout</MenuItem>
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
          {location.pathname === "/admin/login" ? (
            <Link to={"/"}>
              <Text fontSize={"4xl"} padding={"2"}>
                ChumBucket
              </Text>
            </Link>
          ) : (
            <Link to={"/admin/dashboard"}>
              <Text fontSize={"4xl"} padding={"2"}>
                ChumBucket
              </Text>
            </Link>
          )}
        </GridItem>
        <GridItem
          display={"flex"}
          justifyContent={"end"}
          gap="4"
          padding="2"
          my={"auto"}
        >
          {authSelector.username ? (
            location.pathname === "/admin/transaction" ? null : (
              <Link to="/admin/transaction">
                <Button
                  bgColor={"#1b3c4b"}
                  fontSize={"2xl"}
                  _hover={"none"}
                  _active={"none"}
                >
                  <BiBookReader />
                </Button>
              </Link>
            )
          ) : null}
          {authSelector.is_admin ? (
            <Button
              bgColor={"red.500"}
              onClick={logoutBtnHandler}
              _hover={"none"}
              _active={"none"}
            >
              Logout
            </Button>
          ) : null}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default NavbarAdmin;
