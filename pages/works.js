import { Container, Heading, SimpleGrid, Divider } from "@chakra-ui/react";
import Section from "../components/section";
import theme from "../libs/theme";
import { WorkGridItem } from "../components/grid-item";
import Layout from "../components/layouts/article";
import ranguPic from '../public/rangu.png'
import furquimAdvPic from '../public/furquimadv.png';

const Works = () => {
    return (
        <Layout title={'Works'}>
            <Container>
            <Heading as="h2" fontSize={20} mb={4} mt={6} fontFamily={theme.fonts.fontFamily}>
                Works
            </Heading>
            
            <SimpleGrid columns={[1,1,2]} gap={6}>
                <Section>
                    <WorkGridItem id="furquim-law-firm" title="Furquim Law Firm" thumbnail={furquimAdvPic} stack={['Html', 'Bootstrap', 'Javascript']}>
                    A institutional website developed for a prominent Brazilian law firm.
                    </WorkGridItem>
                </Section>
            </SimpleGrid>
            <Section delay={.3}>
                <Divider my={6}/>
                <Heading as="h3" fontSize={20} mb={4} mt={6} fontFamily={theme.fonts.fontFamily}>
                Side Projects
            </Heading>
            
            <SimpleGrid columns={[1,1,2]} gap={6}>
                <Section>
                    <WorkGridItem id="rangu" title="Rangu" thumbnail={ranguPic} stack={["React", "Typescript", "Tailwind"]}>
                    A recipes web application where users can navigate and search through a vast repository of thousands of receipts.
                    </WorkGridItem>
                </Section>
            </SimpleGrid>
            </Section>
        </Container>
        </Layout>
        )
}

export default Works