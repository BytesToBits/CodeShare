import type { AppProps } from "next/app";
import ColorManager from "../components/ColorManager";
import { ChakraProvider } from "@chakra-ui/react";
import CodeShareTheme from "../styles/app.theme";

import "../styles/app.scss";
import Head from "next/head";

export default function CodeShareApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={CodeShareTheme}>
      <Head>
        <title>CodeShare - Code, everywhere</title>
      </Head>

      <ColorManager />

      <Component {...pageProps} />
    </ChakraProvider>
  )
};