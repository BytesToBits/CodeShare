import { useColorMode } from "@chakra-ui/react";
import React from "react";

export default function ColorManager(): JSX.Element {
    const { colorMode, setColorMode } = useColorMode();

    // const iconProps: IconButtonProps = {
    //     "aria-label": "Toggle Color Mode",
    //     icon: colorMode == "dark" ? <FaSun /> : <FaMoon />,
    //     variant: "colorButton",
    //     onClick: () => {
    //         toggleColorMode();
    //         console.log(colorMode);
    //     },
    //     position: "fixed",
    //     bottom: "10px",
    //     right: "10px",
    //     zIndex: 9999
    // };

    // return (
    //     <IconButton {...iconProps} />
    // )

    React.useEffect(() => {
        if(colorMode == "light") setColorMode("dark")
    })

    return <></>

}