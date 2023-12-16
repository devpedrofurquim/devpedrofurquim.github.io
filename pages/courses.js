import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import Section from "../components/section";
import theme from "../libs/theme";
import { GridItem } from "../components/grid-item";
import Layout from "../components/layouts/article";
import jsPic from '../public/JS.png';
import lazyVimPic from '../public/LAZYVIM.png';

const Courses = () => {
    return (
        <Layout title={'Courses'}>
        <Container>
        <span style={{fontWeight: 300, fontSize: 18}}>Learn Software Development with me!</span>

        <Heading as="h2" fontSize={20} mb={4} mt={6} fontFamily={theme.fonts.fontFamily}>
            Courses
        </Heading>
        <SimpleGrid columns={[1,1,2]} gap={6} mt={4}>
            <Section>
                <GridItem id="mastering-vanilla-js" title="Mastering Vanilla JS" thumbnail={jsPic} price={'R$ 29.99'} hours={'+ 6 hours'}>
                Become a Pro JavaScript Developer with this amazing course dedicated to beginners.
                </GridItem>
            </Section>
            <Section>
                <GridItem id="setting-up-lazyvim" title="Setting up LazyVim" thumbnail={lazyVimPic} price={'Free'} hours={'2 hours'}>
                Learn how to set up and configure LazyVim with Lua and build a small React project.
                </GridItem>
            </Section>
        </SimpleGrid>
    </Container>
    </Layout>
    )
}

export default Courses