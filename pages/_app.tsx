import type { AppProps } from "next/app";
import ColorManager from "../components/ColorManager";
import { Box, ChakraProvider, Flex, Image, Text, Link, VStack, List, ListItem } from "@chakra-ui/react";
import CodeShareTheme from "../styles/app.theme";

import "../styles/app.scss";
import Head from "next/head";

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

        <Flex p={5} justifyContent="space-between" alignItems="center" bg="blackAlpha.800" mt="auto" color="white">
          <VStack>
            <Link href="/"><Image alt="CodeShare" src="/favicon.ico" boxSize="50px" /></Link>
            <Text fontSize="12px" color="gray.500">created by <Link href="https://bytestobits.dev/">BytesToBits</Link></Text>
          </VStack>

          <Flex gap={5}>
            <Box>
              <Text fontWeight={"semibold"} fontSize="18px">CodeShare</Text>
              <List fontSize={"13px"} color="gray.500">
                <ListItem>
                  <Link href="/">Index</Link>
                </ListItem>
                <ListItem>
                  <Link href="/create">Create a Document</Link>
                </ListItem>
                <ListItem>
                  <Link href="https://github.com/BytesToBits/CodeShare">Source Code</Link>
                </ListItem>
                <ListItem>
                  <Link href="https://bytestobits.dev/discord">Discord</Link>
                </ListItem>
              </List>
            </Box>
          </Flex>

          <Box></Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  )
};