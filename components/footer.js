import { Box } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box align="center" opacity={0.4} fontSize="sm" mt={5}>
      &copy; {new Date().getFullYear()} Pedro Furquim. All Rights Reserved.
    </Box>
  )
}

export default Footer