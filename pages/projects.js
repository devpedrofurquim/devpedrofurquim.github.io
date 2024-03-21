import { Container, Heading, SimpleGrid, Divider } from "@chakra-ui/react";
import Section from "../components/section";
import theme from "../libs/theme";
import { WorkGridItem } from "../components/grid-item";
import Layout from "../components/layouts/article";
import ranguPic from '../public/rangu.png'
import furquimAdvPic from '../public/furquimadv.png';
import MetodoDen01 from '../public/metodo-den-02.png';
import Notify01 from '../public/notify-01.png';

const Projects = () => {
    return (
        <Layout title={'Projects'}>
            <Container>
            <Heading as="h2" fontSize={20} mb={4} mt={6} fontFamily={theme.fonts.fontFamily}>
                Projects
            </Heading>
            
            <SimpleGrid columns={[1,1,2]} gap={6}>
                <Section>
                    <WorkGridItem id="furquim-law-firm" title="Furquim Law Firm" thumbnail={furquimAdvPic} stack={['Html', 'Bootstrap', 'Javascript']}>
                    A institutional website developed for a prominent Brazilian law firm.
                    </WorkGridItem>
                </Section>
                <Section>
                    <WorkGridItem id="metodo-den" title="Método Den" thumbnail={MetodoDen01} stack={['React', 'Tailwind']}>
                    A Landing Page developed for a Brazilian Coaching Course.
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
                <Section>
                    <WorkGridItem id="notify" title="Notify" thumbnail={Notify01} stack={["Python", "Flask", "Bootstrap"]}>
                    Notify is a minimalist web-based CRUD application that allows users to create, read, update, and delete notes.
                    </WorkGridItem>
                </Section>
            </SimpleGrid>
            </Section>
        </Container>
        </Layout>
        )
}

export default Projects