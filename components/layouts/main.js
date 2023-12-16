import Head from 'next/head'
import Navbar from '../navbar.js'
import animationLight from '/public/Animation--Light.json'
import animationDark from '/public/Animation--Dark.json'
import { Box, Container, useColorModeValue } from '@chakra-ui/react'
import Lottie from 'lottie-react'
import { useRef } from 'react'
import Footer from '../footer'


const Main = ({ children, router }) => {
  const helloRef = useRef()


  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Pedro Furquim Homepage" />
        <meta name="author" content="Pedro Furquim" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="shortcut icon" href="/favicon.ico" type="image/ico" />
        <meta name="twitter:title" content="Pedro Furquim" />
        <meta name="twitter:site" content="@devpedrofurquim" />
        <meta name="twitter:creator" content="@devpedrofurquim" />
        <meta property="og:site_name" content="Pedro Furquim" />
        <meta name="og:title" content="Pedro Furquim" />
        <meta property="og:type" content="website" />
        <title>Pedro Furquim - Homepage</title>
      </Head>
      <Navbar path={router.asPath}></Navbar>
      <Container maxW="container.md" pt={14}>
      <Lottie
        lottieRef={helloRef}
        animationData={useColorModeValue(animationLight, animationDark)}
        loop={true}
        style={{
          width: '40%',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
        }}
      />
        {children}
        <Footer />
      </Container>
    </Box>
  )
}

export default Main
