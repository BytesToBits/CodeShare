import { AbsoluteCenter, Box, Flex, Heading, Text, useColorMode } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import React from "react";
import Editor from "react-simple-code-editor";
import { findDocument } from "../lib/db/Documents";
import useLangSelector from "../lib/hooks/useLangSelector";

import style from "../styles/create.module.scss";
import Prism from "prismjs";

type Document = {
    name?: string
    content?: string
    language?: string
    created_at?: string
  }

export default function ViewDocument({ document }: { document?: Document }) {

    const { codeSettings, Selector } = useLangSelector(document?.language || "javascript");
    const { colorMode } = useColorMode();

    if(!document) {
        return (
            <AbsoluteCenter>
                <Heading>This document does not exist!</Heading>
            </AbsoluteCenter>
        )
    }

    return (
        <Flex
            h="100vh"
            w="100vw"
            overflow={"auto"}
            direction="column"
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
    )

}

export const getServerSideProps = async(ctx: GetServerSidePropsContext) => {
    const { name } = ctx.query;

    const document = await findDocument(name as string);

    return {
        props: {
            document: {
                name: document?.name,
                content: document?.content,
                language: document?.language
            }
        }
    }
}