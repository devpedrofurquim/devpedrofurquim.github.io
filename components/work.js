import NextLink from 'next/link'
import { Heading, Box, Image, Link, Tag } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import theme from '../libs/theme'


export const Title = ({ children }) => (
  <Box>
    <Link as={NextLink} href="/works" fontFamily={theme.fonts.fontFamily} fontWeight={300}>
      Works
    </Link>
    <span>
      {' '}
      <ChevronRightIcon />{' '}
    </span>
    <Heading display="inline-block" as="h3" fontSize={22} mb={4} fontFamily={theme.fonts.fontFamily} fontWeight={700}>
      {children}
    </Heading>
  </Box>
)

export const WorkImage = ({ src, alt }) => (
  <Image borderRadius="lg" src={src} w="full" alt={alt} mb={4} />
)

export const Meta = ({ children }) => (
  <Tag colorScheme="gray" mr={2}>
    {children}
  </Tag>
)