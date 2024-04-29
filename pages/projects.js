import { Container, Heading, SimpleGrid, Divider } from "@chakra-ui/react";
import Section from "../components/section";
import theme from "../libs/theme";
import { WorkGridItem } from "../components/grid-item";
import Layout from "../components/layouts/article";
import ranguPic from '../public/rangu.png'
import furquimAdvPic from '../public/furquimadv.png';
import Notify01 from '../public/notify-01.png';
import Evogym from '../public/evogym-1.png';
import Netflix from '../public/netflix-1.png';
import Hangman from '../public/hangman-1.png';
import Movieland from '../public/movieland-1.png';

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
            </SimpleGrid>
            <Section delay={.3}>
                <Divider my={6}/>
                <Heading as="h3" fontSize={20} mb={4} mt={6} fontFamily={theme.fonts.fontFamily}>
                Side Projects
            </Heading>
            
            <SimpleGrid columns={[1,1,2]} gap={6}>
                <Section>
                    <WorkGridItem id="evogym" title="Evogym" thumbnail={Evogym} stack={["Typescript", "Next.JS", "Tailwind"]}>
                    A landing page website developed for a Evolutionary Fitness company.
                    </WorkGridItem>
                </Section>
                <Section>
                    <WorkGridItem id="rangu" title="Rangu" thumbnail={ranguPic} stack={["React", "Typescript", "Tailwind"]}>
                    A recipes web application where user can search for recipes.
                    </WorkGridItem>
                </Section>
                <Section>
                    <WorkGridItem id="notify" title="Notify" thumbnail={Notify01} stack={["Python", "Flask", "Bootstrap"]}>
                    Notify is a minimalist web-based Notes application.
                    </WorkGridItem>
                </Section>
                <Section>
                    <WorkGridItem id="netflix" title="Netflix" thumbnail={Netflix} stack={["Html", "Css", "JavaScript"]}>
                    Netflix clone website developed for studying purposes.
                    </WorkGridItem>
                </Section>
                <Section>
                    <WorkGridItem id="hangman" title="Hangman Game" thumbnail={Hangman} stack={["Typescript", "React"]}>
                    Classic word-guessing game built using React and TypeScript.
                    </WorkGridItem>
                </Section>
                <Section>
                    <WorkGridItem id="movieland" title="Movieland" thumbnail={Movieland} stack={["React", "JavaScript", "Css"]}>
                    React web app that allows you to explore movies and TV shows.
                    </WorkGridItem>
                </Section>
            </SimpleGrid>
            </Section>
        </Container>
        </Layout>
        )
}

export default Projects