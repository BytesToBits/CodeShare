import { Box, Heading, Text } from "@chakra-ui/react";

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
    </Box>
  )
}