import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      bg: mode('rgba(0, 0, 0, 0.04)', 'rgba(255, 255, 255, 0.04)')(props),
      fontFamily: "'Space Grotesk', sans-serif"
    },
  }),
}

const components = {
  Heading: {
    variants: {
      'section-title': {
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: '700',
        textDecoration: 'underline',
        fontSize: 22,
        textUnderlineOffset: 6,
        textDecorationColor: '#525252',
        textDecorationThickness: 2,
        marginTop: 3,
        marginBottom: 4,
      },
    },
  },
  Link: {
    baseStyle: props => ({
      color: mode('#3d7aed', '#9CBBF5')(props),
      textUnderlineOffset: 3,
    }),
  },
}

const fonts = {
  fontFamily: "'Space Grotesk', sans-serif"
}

const colors = {
  glassTeal: '#88ccca',
}

const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

const theme = extendTheme({
  config,
  styles,
  components,
  colors,
  fonts,
})

export default theme
