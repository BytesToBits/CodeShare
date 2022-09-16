import { AbsoluteCenter, Box, Flex, Heading, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useColorMode, useDisclosure } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import React from "react";
import Editor from "react-simple-code-editor";
import { findDocument } from "../lib/db/Documents";
import useLangSelector from "../lib/hooks/useLangSelector";

import style from "../styles/create.module.scss";
import Prism from "prismjs";
import { CodeDocument } from "../lib/db/types";

export default function ViewDocument({ document }: { document?: CodeDocument }) {

    const { codeSettings, Selector } = useLangSelector(document?.language || "javascript");
    const { colorMode } = useColorMode();
    const [show, setShow] = React.useState<boolean>(document?.password == null);


    if (!document) {
        return (
            <AbsoluteCenter>
                <Heading>This document does not exist!</Heading>
            </AbsoluteCenter>
        )
    }

    return (
        <>
            <Modal onClose={() => null} isOpen={!show} isCentered={true}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Document is Password Protected. Enter password to unlock.</ModalHeader>
                    <ModalBody>
                        <Input type="password" autoComplete={"off"} name="documentProtection" onChange={(e) => { if(e.target.value == document.password) setShow(true) }} />
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Flex
                h="100vh"
                w="100vw"
                overflow={"auto"}
                direction="column"
                opacity={show ? 1 : 0}
            >
                <Flex alignItems="center" h="50px" bg="blackAlpha.900" px={2}>
                    <Text bg={`background.${colorMode}`} p={2} roundedTop="10px" fontWeight={"medium"} fontStyle="italic" alignSelf="end" ml={2}>{document.name}.{codeSettings.value.short || codeSettings.value.language}</Text>


                    <Flex ml="auto">
                        <Selector />
                    </Flex>

                </Flex>

                <Box h="100%" w="100%">
                    <Editor
                        value={document!.content!}
                        onValueChange={() => null}
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
        </>
    )

}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const { name } = ctx.query;

    const document = await findDocument(name as string);

    return {
        props: {
            document: {
                name: document?.name,
                language: document?.language,
                content: document?.content,
                password: document?.password || null
            }
        }
    }
}