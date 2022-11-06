import { Box, Image, Text } from "@chakra-ui/react"

const AdminTransactionItem = ({
  title,
  author,
  genre,
  publish_date,
  image_url,
  category_name,
}) => {
  return (
    <Box
      height={"auto"}
      backgroundColor={"white"}
      borderRadius="15px"
      mb="4"
      p={"4"}
    >
      <Box
        fontSize={"16px"}
        display={{ base: "block", md: "flex", lg: "flex" }}
      >
        <Image
          height="200px"
          width={"auto"}
          mx={{ base: "auto", md: "0", lg: "0" }}
          src={
            image_url ||
            "https://cdn.gramedia.com/uploads/items/9786024246945_Laut-Bercerita.jpg"
          }
        />

        <Box ml={"20px"} my="auto">
          <Text fontSize={"22px"}>{title}</Text>

          <Text fontWeight={"normal"} fontSize={"15px"}>
            {author || "Diaa"}
          </Text>

          <Text fontWeight={"normal"} fontSize={"15px"}>
            {category_name || "Entah"}
          </Text>

          <Text fontWeight={"normal"} fontSize={"15px"}>
            {publish_date || "1945"}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default AdminTransactionItem
