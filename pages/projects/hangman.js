import { Container, Tag, Link, List, ListItem} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Title, WorkImage, Meta } from '../../components/work';
import Bio from '../../components/bio';
import Layout from '../../components/layouts/article';


const Project = () => {
    return (
        <Layout title="Hangman">
            <Container>
                <Title>
                    Hangman Game <Tag>2023</Tag>
                </Title>
                <Bio>
                Hangman Game is a classic word-guessing game built using React and TypeScript. It provides an enjoyable experience for players by allowing them to choose between Portuguese, French, and English words to guess. Test your vocabulary and have fun solving the word puzzles with the tips the game provides.
                </Bio>
                <List ml={4} my={4} gap={2} display="flex" flexDirection="column">
                    <ListItem>
                        <Meta>Website</Meta>
                        <Link href='https://devpedrofurquim.github.io/hangman/' target='_blank'>https://devpedrofurquim.github.io/hangman/ <ExternalLinkIcon mx="2px"/></Link>
                    </ListItem>
                    <ListItem>
                        <Meta>Stack</Meta>
                        <span>React, TypeScript, Css</span>
                    </ListItem>
                    <ListItem>
                        <Meta>Github Repository</Meta>
                        <Link href='https://github.com/devpedrofurquim/hangman' target='_blank'>Source Code<ExternalLinkIcon mx="2px"/></Link>
                    </ListItem>
                </List>
                <WorkImage src={"../../hangman-1.png"} alt={'Hangman'}/>
                <WorkImage src={"../../hangman-2.png"} alt={'Hangman'}/>
            </Container>
        </Layout>
    )
}

export default Project