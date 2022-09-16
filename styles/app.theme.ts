import { extendTheme, ThemeConfig, StyleFunctionProps } from "@chakra-ui/react";
import { Styles } from "@chakra-ui/theme-tools"
import CodeShareTheme from "../lib/types/CodeShareTheme";

import { Button } from "./components/Button";

const config: ThemeConfig = {
    initialColorMode: "system",
    useSystemColorMode: true,
};

export const colors: CodeShareTheme['colors'] = {
    background: {
        dark: "#113139",
        light: "#E1E1E1"
    },
};

const styles: Styles = {
    global: (props: StyleFunctionProps) => ({
        "body": {
            backgroundColor: `background.${props.colorMode}`
        }
    })
};

const components = {
    Button
}

const theme: CodeShareTheme = {
    config,
    styles,
    colors,
    components
};

export default extendTheme(theme);