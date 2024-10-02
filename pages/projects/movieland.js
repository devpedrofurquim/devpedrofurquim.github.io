import { Container, Tag, Link, List, ListItem} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Title, WorkImage, Meta } from '../../components/work';
import Bio from '../../components/bio';
import Layout from '../../components/layouts/article';


const Project = () => {
    return (
        <Layout title="Movieland">
            <Container>
                <Title>
                    Movieland <Tag>2023</Tag>
                </Title>
                <Bio>
                Welcome to MovieLand, a simple React web app that allows you to explore movies and TV shows using data from the IMDb API. This app provides an intuitive user interface to search for various films and television series.
                </Bio>
                <List ml={4} my={4} gap={2} display="flex" flexDirection="column">
                    <ListItem>
                        <Meta>Website</Meta>
                        <Link href='https://devpedrofurquim.github.io/movieland/' target='_blank'>https://devpedrofurquim.github.io/movieland/ <ExternalLinkIcon mx="2px"/></Link>
                    </ListItem>
                    <ListItem>
                        <Meta>Stack</Meta>
                        <span>React, JavaScript, Css</span>
                    </ListItem>
                    <ListItem>
                        <Meta>Github Repository</Meta>
                        <Link href='https://github.com/devpedrofurquim/movieland' target='_blank'>Source Code<ExternalLinkIcon mx="2px"/></Link>
                    </ListItem>
                </List>
                <WorkImage src={"../../movieland-1.png"} alt={'Furquim'}/>
                <WorkImage src={"../../movieland-2.png"} alt={'Furquim'}/>
            </Container>
        </Layout>
    )
}

export default Project