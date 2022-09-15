import { ComponentStyleConfig, StyleFunctionProps } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
    variants: {
        colorButton: (props: StyleFunctionProps) => ({
            background: "blackAlpha.800",
            color: "white"
        })
    }
}