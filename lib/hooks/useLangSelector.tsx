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

import Select from "react-select";
import { CodeSettings } from "../types/CodeSettingsType";
import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import SelectStyle from "../../styles/select.style";

export default function useLangSelector(defaultLanguage: string) {
    const LANGUAGES: { [key:string]: { label: string, value: CodeSettings} } = {
        javascript: { label: "JavaScript", value: { grammar: Prism.languages.javascript, language: 'javascript' } },
        python: { label: "Python", value: { grammar: Prism.languages.python, language: 'python' } },
        c: { label: "C", value: { grammar: Prism.languages.clike, language: 'c' } },
        cpp: { label: "C++", value: { grammar: Prism.languages.clike, language: 'c++' } },
        cs: { label: "C#", value: { grammar: Prism.languages.clike, language: 'c#' } },
        java: { label: "Java", value: { grammar: Prism.languages.java, language: 'java' } },
        kotlin: { label: "Kotlin", value: { grammar: Prism.languages.kotlin, language: 'kotlin' } },
        swift: { label: "Swift", value: { grammar: Prism.languages.swift, language: 'swift' } },
        typescript: { label: "TypeScript", value: { grammar: Prism.languages.typescript, language: 'typescript' } },
        go: { label: "Go", value: { grammar: Prism.languages.go, language: 'go' } },
        ruby: { label: "Ruby", value: { grammar: Prism.languages.ruby, language: 'ruby' } },
        r: { label: "R", value: { grammar: Prism.languages.r, language: 'r' } },
        regex: { label: "Regex", value: { grammar: Prism.languages.regex, language: 'regex' } },
        scala: { label: "Scala", value: { grammar: Prism.languages.scala, language: 'scala' } },
        brainfuck: { label: "Brainfuck", value: { grammar: Prism.languages.brainfuck, language: 'brainfuck' } },
        json: { label: "JSON", value: { grammar: Prism.languages.json, language: 'json' } },
        rust: { label: "Rust", value: { grammar: Prism.languages.rust, language: 'rust' } },
        text: { label: "Text", value: { grammar: Prism.languages.text, language: 'text' } },
    };

    const [codeSettings, setCodeSettings] = React.useState<{ label: string, value: CodeSettings }>(LANGUAGES[defaultLanguage.toLocaleLowerCase()] || LANGUAGES.javascript);

    const Selector = (props: BoxProps) => (
        <Box {...props}>
            <Select
                styles={SelectStyle}
                isSearchable
                options={Object.keys(LANGUAGES).map(key => LANGUAGES[key])}
                defaultValue={codeSettings}
                onChange={(newVal) => {
                    const value = newVal as { label: string, value: CodeSettings };
                    setCodeSettings(value)
                }}
                instanceId={"selectLang"}
            />
        </Box>
    );

    return {
        Selector,
        setCodeSettings,
        codeSettings
    }
}