import NextLink from 'next/link'
import {
  Container,
  Box,
  Heading,
  Link,
  Button,
  List,
  ListItem,
  useColorModeValue,
  chakra
} from '@chakra-ui/react'
import Image from 'next/image'
import theme from '../libs/theme'
import pedroImage from '../public/pedro2.jpg'
import Section from '../components/section'
import Bio from '../components/bio'
import Layout from '../components/layouts/article'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { FaLinkedin } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import {StorySection, StoryYear} from '../components/story'
import {
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoGithub,
  IoLogoLinkedin
} from 'react-icons/io5'

const ProfileImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const Page = () => {

  return (
    <Layout>
       <Container>
      <Box
        borderRadius="lg"
        color={useColorModeValue('black', 'white')}
        p={3}
        mb={6}
        align="center"
        bg={useColorModeValue(
          'rgba(0, 0, 0, 0.04)',
          'rgba(255, 255, 255, 0.04)',
        )}
        fontFamily={theme.fonts.fontFamily}
      >
        I&apos;m Pedro, a brazilian software developer!
      </Box>
      <Box display='flex' flexDirection={{base: 'column', md: 'row'}}>
      <Box flexShrink={0} mt={{base: 4, md: 0}} mr={{md: 6}} align="center" order={{ base: 2, md: 1 }}>
        <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="100px"
            h="auto"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <ProfileImage
              src={pedroImage}
              alt="Profile image"
              borderRadius="full"
              width="100"
              height="100"
            />
          </Box>
        </Box>
        <Box flexGrow={1} order={{ base: 1, md: 2 }}>
          <Heading as="h2" variant="page-title" fontFamily={theme.fonts.fontFamily}>
            Pedro Furquim
          </Heading>
          <p>
            Software Developer ( Front-end / Back-end / Blockchain )
          </p>
        </Box>
      </Box>
      <Section delay={0.1}>
          <Heading as="h3" variant="section-title">
            About
          </Heading>
          <Bio>
            I&apos; Pedro, a 23-year-old Brazilian Software Developer pursuing a Bachelor&apos;s degree in Computer Engineering. 
            You&apos;ll often find me live coding on {' '} <Link as={NextLink} target='_blank' href="https://www.twitch.tv/pedrofurquimdev">Twitch TV</Link>, 
            building digital products on {' '}<Link as={NextLink} target='_blank' href="https://github.com/devpedrofurquim">Github</Link>, or teaching coding related subjects{' '}
            <Link as={NextLink} href="/courses">Courses.</Link> {' '}
            Let&apos;s connect and create some coding magic together! {' '}
          </Bio>
          <Box align="center" my={4} gap={3} display="flex" justifyContent="center" flexDirection={{base: 'column', md: 'row'}}>
            <Link as={NextLink} href='https://www.linkedin.com/in/pedro-furquim-dev/' target='_blank'>
              <Button leftIcon={<FaLinkedin/>} rightIcon={<ChevronRightIcon/>} colorScheme='blue'>My Linkedin</Button>
            </Link>
            <Link as={NextLink} href='/works'>
              <Button  leftIcon={<FaCode/>} rightIcon={<ChevronRightIcon/>} colorScheme='blue'>My Portfolio</Button>
            </Link>
          </Box>
      </Section>
      <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Bio
          </Heading>
          <StorySection>
            <StoryYear>
              2000
            </StoryYear>
            Born in Sorocaba, Brazil.
          </StorySection>
          <StorySection>
            <StoryYear>
              2021
            </StoryYear>
            Started my coding journey by developing small indie games with C# on the Unity plataform.
          </StorySection>
          <StorySection>
            <StoryYear>
              2023
            </StoryYear>
            Enrolled in a Computer Engineering bachelor&apos;s program at <Link as={NextLink} target='_blank' href="https://uniso.br/home">@Uniso University.</Link>
          </StorySection>
      </Section>
      <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
          Tech Stack
          </Heading>
          <Bio>
          JavaScript, React, Typescript, Next, Tailwind, Chakra UI, CSS / SASS, Nest, Node, Express, Python, Flask, Django, Fast API, C#, .NET
          </Bio>
      </Section>
      <Section delay={0.3}>
          <Heading as="h3" variant="section-title" >
            My Links
          </Heading>
          <List>
            <ListItem mb={2}>
              <Link href='https://github.com/devpedrofurquim' target='_blank'>
                <Button variant="ghost" colorScheme='blue' leftIcon={<IoLogoGithub/>}>@devpedrofurquim</Button>
              </Link>
            </ListItem>
            <ListItem mb={2}>
              <Link href='https://twitter.com/devpedrofurquim' target='_blank'>
                <Button variant="ghost" colorScheme='blue' leftIcon={<IoLogoTwitter/>}>@pedrofurquim</Button>
              </Link>
            </ListItem>
            <ListItem mb={2}>
              <Link href='https://www.instagram.com/pedroo.tsx/' target='_blank'>
                <Button variant="ghost" colorScheme='blue' leftIcon={<IoLogoInstagram/>}>@pedrofurquim</Button>
              </Link>
            </ListItem>
            <ListItem mb={2}>
              <Link href='https://www.linkedin.com/in/pedro-furquim-dev/' target='_blank'>
                <Button variant="ghost" colorScheme='blue' leftIcon={<IoLogoLinkedin/>}>@pedrofurquim</Button>
              </Link>
            </ListItem>
          </List>
      </Section>
    </Container>
    </Layout>
  )
}

export default Page
