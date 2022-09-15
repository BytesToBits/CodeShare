import { IconButton, useColorMode, IconButtonProps } from "@chakra-ui/react";
import React from "react";

import { FaSun, FaMoon } from "react-icons/fa"

export default function ColorManager(): JSX.Element {
    const { colorMode, toggleColorMode } = useColorMode();

    const iconProps: IconButtonProps = {
        "aria-label": "Toggle Color Mode",
        icon: colorMode == "dark" ? <FaSun /> : <FaMoon />,
        variant: "colorButton",
        onClick: () => {
            toggleColorMode();
            console.log(colorMode);
        },
        position: "fixed",
        bottom: "10px",
        right: "10px"
    };

    return (
        <IconButton {...iconProps} />
    )

}