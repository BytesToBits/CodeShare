import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import React from "react";
import Editor from "react-simple-code-editor";
import useLangSelector from "../lib/hooks/useLangSelector";

import style from "../styles/create.module.scss";
import * as Prism from "prismjs"


export default function CreateDocument() {

    const { colorMode } = useColorMode();
    const { codeSettings, setCodeSettings, Selector } = useLangSelector("javascript");

    const [code, setCode] = React.useState<string>("const instructions = \"START WRITING SOME CODE!\"");    

    return (
        <Flex
            h="100vh"
            w="100vw"
            overflow={"auto"}
            direction="column"
        >
            <Flex alignItems="center" h="50px" bg="blackAlpha.900" px={2}>
                <Text bg={`background.${colorMode}`} p={2} roundedTop="10px" fontWeight={"medium"} fontStyle="italic" alignSelf="end" ml={2}>New File.txt</Text>

                <Selector ml="auto" />

            </Flex>

            <Box h="100%" w="100%">
                <Editor
                    value={code}
                    onValueChange={setCode}
                    highlight={code => Prism.highlight(code, codeSettings.value.grammar, codeSettings.value.language)}
                    textareaClassName={style.codeArea}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 16,
                    }}
                />
            </Box>

        </Flex>
    )
}