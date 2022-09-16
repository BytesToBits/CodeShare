import type { AppProps } from "next/app";
import ColorManager from "../components/ColorManager";
import { ChakraProvider } from "@chakra-ui/react";
import CodeShareTheme from "../styles/app.theme";

import "../styles/app.scss";

export default function CodeShareApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={CodeShareTheme}>
      <ColorManager />

      <Component {...pageProps} />
    </ChakraProvider>
  )
};