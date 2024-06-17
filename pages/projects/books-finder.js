import { Container, Tag, Link, List, ListItem} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Title, WorkImage, Meta } from '../../components/work';
import Bio from '../../components/bio';
import Layout from '../../components/layouts/article';


const Project = () => {
    return (
        <Layout title="Books Finder">
            <Container>
                <Title>
                    Books Finder <Tag>2024</Tag>
                </Title>
                <Bio>
                    A React Native application that offers users a seamless experience by enabling them to sign in, search for books using titles, authors, or genres, and access detailed information about each book, including a direct purchase link to Amazon.
                </Bio>
                <List ml={4} my={4} gap={2} display="flex" flexDirection="column">
                    <ListItem>
                        <Meta>Stack</Meta>
                        <span>React Native</span>
                    </ListItem>
                    <ListItem>
                        <Meta>Github Repository</Meta>
                        <Link href='https://github.com/devpedrofurquim/books-finder' target='_blank'>Source Code<ExternalLinkIcon mx="2px"/></Link>
                    </ListItem>
                </List>
                <WorkImage src={"../../books-finder-4.png"} alt={'D281'}/>
                <WorkImage src={"../../books-finder-3.png"} alt={'D281'}/>
                <WorkImage src={"../../books-finder-2.png"} alt={'D281'}/>
            </Container>
        </Layout>
    )
}

export default Project