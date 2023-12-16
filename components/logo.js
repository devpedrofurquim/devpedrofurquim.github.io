import Link from 'next/link'
import Image from 'next/image'
import { Text, useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'
import theme from '../libs/theme'

const LogoBox = styled.span`
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;

  &:hover img {
    transform: rotate(20deg);
  }
`

const Logo = () => {
  const LogoImg = `/waving-hand.png`

  return (
    <Link href="/">
      <LogoBox>
        <Image src={LogoImg} width={20} height={20} alt="logo" />
        <Text
          color={useColorModeValue('gray.800', 'whiteAlpha.900')}
          fontWeight={700}
          fontSize={20}
          letterSpacing={0.1}
          fontFamily={theme.fonts.fontFamily}
          ml={3}
        >
          Pedro Furquim
        </Text>
      </LogoBox>
    </Link>
  )
}

export default Logo
