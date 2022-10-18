import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../api";
import Cart from "../components/Cart";
import { fillCart } from "../redux/features/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartSelector = useSelector((state) => state.cart);

  const toast = useToast();

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get("/carts");

      dispatch(fillCart(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(showBookId);

  // console.log(showBookId);

  const checkOutBtnHandler = async () => {
    const showBookId = cartSelector.data.map((val) => {
      return {
        CartId: val.id,
        BookId: val.BookId,
        quantity: 1,
      };
    });

    try {
      let checkOutItem = {
        items: [...showBookId],
      };

      console.log(checkOutItem);

      // let checkOutItemJSON = JSON.stringify(checkOutItem);

      await axiosInstance.post("/carts/checkOut", checkOutItem);

      fetchCart();

      toast({
        title: "checked out",
        status: "success",
      });
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
    return cartSelector.data.map((val) => {
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
              Total Items: {cartSelector.data.length}
            </Text>
          </Box>
          {/* cart items  */}
          {renderCartItems()}
          {/* cart items */}
          {!cartSelector.data.length ? (
            <Box margin={"20px 20px 20px 20px"}>
              <Alert status="warning" borderRadius={"20px"}>
                <AlertIcon />
                <AlertTitle>No Items found</AlertTitle>
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
            {cartSelector.data.length ? (
              <Button
                mb={"20px"}
                bgColor={"#1b3c4b"}
                color={"white"}
                onClick={checkOutBtnHandler}
              >
                Checkout
              </Button>
            ) : null}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default CartPage;
