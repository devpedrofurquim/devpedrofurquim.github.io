import NextLink from 'next/link'
import Image from 'next/image'
import { Tag, Box, Text, LinkBox, LinkOverlay, Flex} from '@chakra-ui/react'
import { Global } from '@emotion/react'


export const GridItem = ({ 
  children,
  href, 
  id, 
  category = "courses", 
  title, 
  thumbnail, 
  hours, 
  price}) => {
  return (
    <Box w="100%" textAlign="center">
    <LinkBox 
    as={NextLink} 
    href={`/${category}/${id}`} 
    scroll={false}
    cursor="pointer"
    >
    <Image
        src={thumbnail}
        alt={title}
        className="grid-item-thumbnail"
        placeholder="blur"
      />
      <LinkOverlay as="div" href={href} target="_blank">
        <Text mt={2} fontSize={20}>
          {title}
        </Text>
      </LinkOverlay>
      <Flex mt={1} mb={2} gap={2} align="center" justify="center">
      <Tag>
        {price}
      </Tag>
      <Tag>
        {hours}
      </Tag>
      </Flex>
    </LinkBox>
    <Text fontSize={14}>{children}</Text>
  </Box>
  )
}



export const WorkGridItem = ({
  children,
  category = 'works',
  id,
  title,
  thumbnail,
  stack= []
}) => {
  return (
    <Box w="100%" textAlign="center">
    <LinkBox
      as={NextLink}
      href={`/${category}/${id}`}
      scroll={false}
      cursor="pointer"
    >
      <Image
        src={thumbnail}
        alt={title}
        className="grid-item-thumbnail"
        placeholder="blur"
      />
      {stack.map((stackItem, index) => (
        <Tag mt={6} mx={2} colorScheme='gray' fontFamily={300} fontSize={12} key={index}>{stackItem}</Tag>
      ))}
      <LinkOverlay as="div" href={`/${category}/${id}`}>
        <Text mt={2} fontSize={20}>
          {title}
        </Text>
      </LinkOverlay>
      <Text fontSize={14}>{children}</Text>
    </LinkBox>
  </Box>
  )
}



export const GridItemStyle = () => (
  <Global
    styles={`
      .grid-item-thumbnail {
        border-radius: 12px;
      }
    `}
  />
)