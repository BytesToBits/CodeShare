import { ComponentStyleConfig, Theme } from "@chakra-ui/react";

type CodeShareTheme = Partial<Omit<Theme, 'colors' | 'components'>> & {
    colors?:{
        [key: string]: string | { [key: string]: string }
    },
    components?: {
        [key: string]: ComponentStyleConfig
    }
};

export default CodeShareTheme;