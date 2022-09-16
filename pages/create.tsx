import { Box, Flex, IconButton, Text, useColorMode, useToast } from "@chakra-ui/react";
import React from "react";
import Editor from "react-simple-code-editor";
import useLangSelector from "../lib/hooks/useLangSelector";
import axios from "axios";

import style from "../styles/create.module.scss";
import * as Prism from "prismjs"

import { FaSave } from "react-icons/fa"
import { useRouter } from "next/router";

export default function CreateDocument() {
    const router = useRouter();
    const { colorMode } = useColorMode();
    const { codeSettings, Selector } = useLangSelector("javascript");
    const toast = useToast({
        position: "bottom",
        variant: "top-accent",
        isClosable: true
    });

    const [isSaving, setSaving] = React.useState<boolean>(false);
    const [code, setCode] = React.useState<string>("const instructions = \"START WRITING SOME CODE!\"");

    function handleSave() {
        setSaving(true);

        if(code.length == 0) {
            toast({
                status: "error",
                title:"Error",
                description:"Cannot create an empty document"
            })
        } else {
            axios.post('/api/save', { content: code, language: codeSettings.value.language })
            .then((response) => {
                router.push(`/${response.data.name}`)
            })
            .catch((err) => {
                toast({
                    status: "error",
                    title: "Error",
                    description: "There was an error creating this document.",
                })
                console.log(err)
            })
        }
        setSaving(false)
    }

    return (
        <Flex
            h="100vh"
            w="100vw"
            overflow={"auto"}
            direction="column"
        >
            <Flex alignItems="center" h="50px" bg="blackAlpha.900" px={2}>
                <Text bg={`background.${colorMode}`} p={2} roundedTop="10px" fontWeight={"medium"} fontStyle="italic" alignSelf="end" ml={2}>New File.{codeSettings.value.short || codeSettings.value.language}</Text>


                <Flex ml="auto">
                    <IconButton aria-label="Save Code" icon={<FaSave />} isDisabled={isSaving} onClick={handleSave} />

                    <Selector />
                </Flex>

            </Flex>

            <Box h="100%" w="100%">
                <Editor
                    value={code}
                    onValueChange={(code: string) => { if(!isSaving) setCode(code) }}
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