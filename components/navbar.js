import { forwardRef } from 'react'
import Logo from './logo.js'
import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { FaGithub } from 'react-icons/fa'
import ThemeToggleButton from './theme-toggle-button.js'
import theme from '../libs/theme.js'

const LinkItem = ({ href, path, children }) => {
  const active = path === href
  return (
    <Link
      as={NextLink}
      href={href}
      p={2}
      textDecoration={active ? 'underline' : ''}
      textUnderlineOffset={6}
      borderRadius='20%'
      color={useColorModeValue('gray.900', 'gray.100')}
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={1}
    >
      {children}
    </Link>
  )
}

const MenuLink = forwardRef((props, ref) => (
  <Link ref={ref} as={NextLink} {...props} />
))

MenuLink.displayName = 'MenuLink';

const Navbar = props => {
  const { path } = props

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('rgba(0, 0, 0, 0.04)', 'rgba(255, 255, 255, 0.04)')}
      style={{ backdropFilter: 'blur(10px)' }}
      zIndex={1}
      {...props}
      fontFamily={theme.fonts.fontFamily}
      fontWeight={300}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="/projects" path={path}>
            Projects
          </LinkItem>
          {/* <LinkItem href="/courses" path={path}>
            Courses
          </LinkItem> */}
          <LinkItem href="https://github.com/devpedrofurquim" as={Link}>
            <FaGithub />
            Github
          </LinkItem>
        </Stack>

        <Box flex={1} align="right">
          <ThemeToggleButton />
          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu" >
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variante="outline"
                aria-label="Options"
              />
              <MenuList>
                <MenuItem as={MenuLink} href="/">
                  Home
                </MenuItem>
                <MenuItem as={MenuLink} href="/works">
                  Works
                </MenuItem>
                {/* <MenuItem as={MenuLink} href="/courses">
                  Courses
                </MenuItem> */}
                <MenuItem
                  as={Link}
                  display="flex"
                  alignItems="center"
                  gap={1}
                  href="https://devpedrofurquim.github.io/"
                  target='_blank'
                >
                  <FaGithub />
                  Github
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
