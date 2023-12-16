import NextLink from 'next/link';
import { Box, Link, Heading, Container, Divider, Button, Text } from '@chakra-ui/react';

const NotFound = () => {
    return (
        <Container>
            <Heading as="h1">Something Went Wrong</Heading>
            <Text>The page you&apos;re looking for was not found.</Text>
            <Divider my={6}/>
            <Box my={6} textAlign="center">
                <Link as={NextLink} href='/'>
                    <Button colorScheme='blue'>Return to home</Button>
                </Link>
            </Box>
        </Container>
    )
}

export default NotFound