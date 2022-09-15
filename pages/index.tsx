import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";

import { FaCode } from "react-icons/fa";
import style from "../styles/index.module.scss";

export default function Home() {
  return (
    <Box className={style.container}>
      <Heading
        fontSize="8xl"
        fontFamily="Pacifico, cursive"
        mt="12vh"
      >
        CodeShare
      </Heading>

      <Text
        fontSize="2xl"
      >
        The best way to share code.
      </Text>

      <Button leftIcon={<FaCode />} colorScheme="facebook">Create Document</Button>

      <Image 
        alt="CodeView"
        src="/CodeVector.png"
        rounded={"10px"}
        animation="floating 2s ease-in-out infinite alternate"
        boxShadow="xl"
        draggable={false}
      />
    </Box>
  )
}