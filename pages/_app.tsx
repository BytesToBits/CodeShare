import type { AppProps } from "next/app";
import ColorManager from "../components/ColorManager";
import { Box, ChakraProvider, Flex, Text } from "@chakra-ui/react";
import CodeShareTheme from "../styles/app.theme";

import "../styles/app.scss";
import Head from "next/head";
import Link from "next/link";

export default function CodeShareApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={CodeShareTheme}>
      <Head>
        <title>CodeShare - Code, everywhere</title>
      </Head>
      <Flex direction="column" minH="100vh" maxW="100vw" overflow="hidden">
        <ColorManager />

        <main>
          <Component {...pageProps} />
        </main>

        <Flex p={5} justifyContent="space-between" alignItems="center" h="100px" bg="blackAlpha.800" mt="auto" color="white">
          <Box>CodeShare, 2022</Box>
          <Box><Link href="/create">CREATE A DOCUMENT</Link></Box>
          <Box>Created by BytesToBits</Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  )
};