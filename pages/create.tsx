import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import React from "react";
import Editor from "react-simple-code-editor";

import * as Prism from "prismjs";
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-brainfuck';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-scala';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-r';
import 'prismjs/components/prism-regex';

import 'prismjs/themes/prism-funky.css';

import style from "../styles/create.module.scss";

import Select from "react-select"
import SelectStyle from "../styles/select.style"
import { CodeSettings } from "../lib/types/CodeSettingsType";


export default function CreateDocument() {
    const LANGUAGES: { label: string, value: CodeSettings }[] = [
        { label: "JavaScript", value: { grammar: Prism.languages.javascript, language: 'javascript' } },
        { label: "Python", value: { grammar: Prism.languages.python, language: 'python' } },
        { label: "C", value: { grammar: Prism.languages.clike, language: 'c' } },
        { label: "C++", value: { grammar: Prism.languages.clike, language: 'c++' } },
        { label: "C#", value: { grammar: Prism.languages.clike, language: 'c#' } },
        { label: "Java", value: { grammar: Prism.languages.java, language: 'java' } },
        { label: "Kotlin", value: { grammar: Prism.languages.kotlin, language: 'kotlin' } },
        { label: "Swift", value: { grammar: Prism.languages.swift, language: 'swift' } },
        { label: "TypeScript", value: { grammar: Prism.languages.typescript, language: 'typescript' } },
        { label: "Go", value: { grammar: Prism.languages.go, language: 'go' } },
        { label: "Ruby", value: { grammar: Prism.languages.ruby, language: 'ruby' } },
        { label: "R", value: { grammar: Prism.languages.r, language: 'r' } },
        { label: "Regex", value: { grammar: Prism.languages.regex, language: 'regex' } },
        { label: "Scala", value: { grammar: Prism.languages.scala, language: 'scala' } },
        { label: "Brainfuck", value: { grammar: Prism.languages.brainfuck, language: 'brainfuck' } },
        { label: "JSON", value: { grammar: Prism.languages.json, language: 'json' } },
        { label: "Rust", value: { grammar: Prism.languages.rust, language: 'rust' } },
        { label: "Text", value: { grammar: Prism.languages.text, language: 'text' } },
    ]

    const { colorMode } = useColorMode()

    const [code, setCode] = React.useState<string>("const instructions = \"START WRITING SOME CODE!\"");
    const [codeSettings, setCodeSettings] = React.useState<{ grammar: Prism.Grammar, language: string }>(LANGUAGES[0].value)

    return (
        <Flex
            h="100vh"
            w="100vw"
            overflow={"auto"}
            direction="column"
        >
            <Flex alignItems="center" h="50px" bg="blackAlpha.900" px={2}>
                <Text bg={`background.${colorMode}`} p={2} roundedTop="10px" fontWeight={"medium"} fontStyle="italic" alignSelf="end" ml={2}>New File.txt</Text>

                <Box ml="auto">
                    <Select
                        styles={SelectStyle}
                        isSearchable
                        options={LANGUAGES}
                        defaultValue={LANGUAGES[0]}
                        onChange={(newVal) => {
                            const value = newVal as { label: string, value: CodeSettings };
                            setCodeSettings(value.value)
                            console.log(Prism.languages)
                        }}
                        instanceId={"selectLang"}
                    />
                </Box>
            </Flex>

            <Box h="100%" w="100%">
                <Editor
                    value={code}
                    onValueChange={setCode}
                    highlight={code => Prism.highlight(code, codeSettings.grammar, codeSettings.language)}
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