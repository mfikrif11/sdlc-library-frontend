import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import Cart from "../components/Cart";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const toast = useToast();

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get("/carts");

      setCartItems(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBtnHandler = async (id) => {
    try {
      await axiosInstance.delete(`/carts/${id}`);

      fetchCart();

      toast({
        title: "Item Deleted",
        status: "info",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderCartItems = () => {
    return cartItems.map((val) => {
      return (
        <Cart
          key={val.id.toString()}
          image={val.Book.image_url}
          title={val.Book.title}
          author={val.Book.author}
          releasedYear={val.Book.publish_date}
          genre={val.Book.genre}
          onDelete={() => deleteBtnHandler(val.id)}
        />
      );
    });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      <Box
        bg={"lightgray"}
        pr={"40px"}
        pl={"40px"}
        pt={"10px"}
        pb={"40px"}
        boxSize={"100%"}
        mt={"60px"}
      >
        <Flex
          pl={"40px"}
          pr={"40px"}
          direction={"column"}
          bg={"white"}
          mt={"40px"}
        >
          <Box fontSize={"4xl"} fontWeight={"bold"} bg={"white"}>
            <Text pl={"40px"} mt={"40px"}>
              My Cart
            </Text>
            <Text
              pl={"40px"}
              fontSize={"20px"}
              fontWeight={"bold"}
              fontStyle={"italic"}
            >
              Total Items: {cartItems.length}
            </Text>
          </Box>
          {/* cart items  */}
          {renderCartItems()}
          {/* cart items */}
          {!cartItems.length ? (
            <Box margin={"20px 20px 20px 20px"}>
              <Alert status="warning" borderRadius={"20px"}>
                <AlertIcon />
                <AlertTitle>No posts found</AlertTitle>
              </Alert>
            </Box>
          ) : null}
          <Box
            pl={"40px"}
            pr={"40px"}
            bg={"white"}
            textAlign={"right"}
            pt={"30px"}
          >
            <Button mb={"20px"} bgColor={"#1b3c4b"} color={"white"}>
              Checkout
            </Button>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default CartPage;
