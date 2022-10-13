import { Box, Image, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const Book = ({ image_url, title, author, publish_date, genre }) => {
  return (
    <Link>
      <Box
        width={"200px"}
        height={"340"}
        backgroundColor={"white"}
        borderRadius="15px"
      >
        <Image
          height="200px"
          width={"100%"}
          objectFit="cover"
          src={
            image_url ||
            "https://e7.pngegg.com/pngimages/81/458/png-clipart-spongebob-squarepants-plankton-s-robotic-revenge-spongebob-squarepants-creature-from-the-krusty-krab-spongebob-s-truth-or-square-plankton-and-karen-mr-krabs-plankton-s-face-leaf-thumbnail.png"
          }
          borderTopRadius="15px"
        />
        <Box height={"70px"}>
          <Text padding={"2"} fontSize="18px">
            {title}
          </Text>
        </Box>
        <Text paddingLeft={"2"} fontWeight="bold" fontSize="15px">
          {genre}
        </Text>
        <Text paddingLeft={"2"} fontSize="13px">
          {author}
        </Text>
        <Text paddingLeft={"2"} fontSize="13px">
          {publish_date}
        </Text>
      </Box>
    </Link>
  )
}

export default Book
