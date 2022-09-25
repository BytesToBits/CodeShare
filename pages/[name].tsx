import { AbsoluteCenter, Box, Flex, Heading, IconButton, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useColorMode, useDisclosure } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";
import Editor from "react-simple-code-editor";
import { findDocument } from "../lib/db/Documents";
import useLangSelector from "../lib/hooks/useLangSelector";

import style from "../styles/create.module.scss";
import Prism from "prismjs";
import { CodeDocument } from "../lib/db/types";
import { FaHome, FaPlusSquare } from "react-icons/fa";
import Head from "next/head";
import * as CryptoJS from "crypto-js";

interface ViewDocumentProps {
    document: CodeDocument
}

export default function ViewDocument({ document, ...rest }: ViewDocumentProps) {
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
            <Head>
                <meta name="216527" title="epal-id" />
                <meta name="e-chat" title="epal-tab" />
            </Head>
            <Modal onClose={() => null} isOpen={!show} isCentered={true}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Document is Password Protected. Enter password to unlock.</ModalHeader>
                    <ModalBody>
                        <Input type="password" autoComplete={"off"} name="documentProtection" onChange={(e) => { if (e.target.value == CryptoJS.AES.decrypt(document!.password!, document.name).toString(CryptoJS.enc.Utf8)) setShow(true) }} />
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Flex
                h="100vh"
                w="100vw"
                overflow={"auto"}
                direction="column"
                hidden={!show}
            >
                <Flex alignItems="center" h="50px" bg="blackAlpha.900" px={2}>
                    <Text bg={`background.${colorMode}`} p={2} roundedTop="10px" fontWeight={"medium"} fontStyle="italic" alignSelf="end" ml={2}>{document.name}.{codeSettings.value.short || codeSettings.value.language}</Text>


                    <Flex ml="auto">
                        <IconButton background="none" aria-label="Go Home" icon={<FaHome />} onClick={() => window.location.href = "/"} />
                        <IconButton background="none" aria-label="New Document" icon={<FaPlusSquare />} onClick={() => window.location.href = "/create"} />
                        <Selector />
                    </Flex>

                </Flex>

                <Box h="100%" w="100%">
                    <Editor
                        value={CryptoJS.AES.decrypt(document!.content!, document.name).toString(CryptoJS.enc.Utf8)}
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

    if(!document) return {
        props: {
            document: null
        }
    }

    return {
        props: {
            document: {
                name: document.name,
                language: document.language,
                content: CryptoJS.AES.encrypt(document.content, document.name).toString(),
                password: document.password ? CryptoJS.AES.encrypt(document.password, document.name).toString() : null
            }
        }
    }
}