import { Box, Button, Heading, Image, Text, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { FaCode } from "react-icons/fa";
import { getAllDocuments } from "../lib/db/Documents";
import { CodeDocument } from "../lib/db/types";
import style from "../styles/index.module.scss";
import Marquee from "react-fast-marquee";
import { LANGUAGES } from "../lib/hooks/useLangSelector";
import * as Prism from "prismjs";
import { colors } from "../styles/app.theme";

function hexToRgb(hex: string): [number, number, number] {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ]
}

function CodeBlock({ document }: { document: CodeDocument }) {
  const prismSettings = LANGUAGES[document.language].value;

  const highlight = Prism.highlight(document.content, prismSettings.grammar, prismSettings.language);

  return (
    <Box p={5} rounded="md" bg="gray.800" color="white" position="relative" w={"300px"} h="100px" mx={5}
      _hover={{ filter: "blur(1px)" }}
      cursor="pointer"
      transition=".5s ease"
      onClick={() => window.location.href = `/${document.name}`}
      overflow="hidden"
    >
      <Text fontWeight="bold" position="absolute" top="5px" right="10px">.{prismSettings.short || prismSettings.language}</Text>
      <div dangerouslySetInnerHTML={{ __html: highlight }} />
    </Box>
  )

}

export default function Home({ documents }: { documents: CodeDocument[] }) {
  const router = useRouter();
  const { colorMode } = useColorMode();

  return (
    <Box className={style.container}>
      <Heading
        fontSize="8xl"
        fontFamily="Pacifico, cursive"
        mt="12vh"
      >
        CodeShare
      </Heading>

      <Text
        fontSize="2xl"
      >
        The best way to share code.
      </Text>

      <Button leftIcon={<FaCode />} colorScheme="facebook" onClick={() => {
        router.push("/create")
      }}>Create Document</Button>


      <Marquee
        speed={40}
        gradientWidth={40}
        style={{
          margin: "30px 0px"
        }}
        gradientColor={hexToRgb(colors.background[colorMode])}
      >
        {documents.map(doc => <CodeBlock document={doc} key={doc.name} />)}
      </Marquee>

      <Image
        alt="CodeView"
        src="/CodeVector.png"
        rounded={"10px"}
        animation="floating 2s ease-in-out infinite alternate"
        boxShadow="xl"
        draggable={false}
      />
    </Box>
  )
}

export const getServerSideProps = async () => {

  const documents = await getAllDocuments();

  return {
    props: {
      documents: documents.filter(doc => !doc.private && !doc.password).map(doc => ({ name: doc.name, content: doc.content, language: doc.language }))
    }
  }

}