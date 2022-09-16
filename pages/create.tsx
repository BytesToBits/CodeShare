import { Box, Flex, IconButton, Text, useColorMode, useToast } from "@chakra-ui/react";
import React from "react";
import Editor from "react-simple-code-editor";
import useLangSelector from "../lib/hooks/useLangSelector";
import axios from "axios";

import style from "../styles/create.module.scss";
import * as Prism from "prismjs"

import { FaHome, FaKey, FaLock, FaPlusSquare, FaSave, FaUnlock } from "react-icons/fa"
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

    const [password, setPassword] = React.useState<string | null>(null);
    const [isPrivate, setPrivate] = React.useState<boolean>(false);

    function handleSave() {
        setSaving(true);

        if(code.length == 0) {
            toast({
                status: "error",
                title:"Error",
                description:"Cannot create an empty document"
            })
            setSaving(false)
        } else {
            axios.post('/api/save', { content: code, language: codeSettings.value.language, private: isPrivate, password: password })
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
                setSaving(false)
            })
        }
    }

    function handleLock() {
        if (isPrivate) {
            toast({
                status: "warning",
                title: "Privacy Status Updated",
                description: "The document will be created as Public"
            })
        } else {
            toast({
                status: "warning",
                title: "Privacy Status Updated",
                description: "The document will be created as Private"
            })
        }

        setPrivate(!isPrivate)
    }

    function handlePassword() {
        const newPassword = prompt("Enter the document password (or press enter to remove it)");

        if(!newPassword) {
            toast({
                status: "warning",
                title: "Password Status Updated",
                description: "The password was removed from this document"
            })
        } else {
            toast({
                status: "warning",
                title: "Password Status Updated",
                description: "THe password for this document was set"
            })
        }

        setPassword(newPassword)

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


                <Flex ml="auto" color="white">
                    <IconButton background="none" aria-label="Go Home" icon={<FaHome />} isDisabled={isSaving} onClick={() => router.push("/")} />
                    <IconButton background="none" aria-label="Toggle Private" icon={isPrivate ? <FaLock /> : <FaUnlock />} isDisabled={isSaving} onClick={handleLock} />
                    <IconButton background="none" aria-label="Set Password" icon={<FaKey />} isDisabled={isSaving} onClick={handlePassword} />
                    <IconButton background="none" aria-label="New Document" icon={<FaPlusSquare />} isDisabled={isSaving} onClick={() => router.reload()} />
                    <IconButton background="none" aria-label="Save Code" icon={<FaSave />} isDisabled={isSaving} onClick={handleSave} />

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