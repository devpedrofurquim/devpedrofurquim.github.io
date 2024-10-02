import { Container, Tag, Link, List, ListItem} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Title, WorkImage, Meta } from '../../components/work';
import Bio from '../../components/bio';
import Layout from '../../components/layouts/article';


const Project = () => {
    return (
        <Layout title="Netflix">
            <Container>
                <Title>
                    Netflix <Tag>2024</Tag>
                </Title>
                <Bio>
                Netflix landing page clone made with Html, Css and JavaScript. Developed for studying purposes.
                </Bio>
                <List ml={4} my={4} gap={2} display="flex" flexDirection="column">
                    <ListItem>
                        <Meta>Website</Meta>
                        <Link href='https://devpedrofurquim.github.io/netlix-landing-page/' target='_blank'>https://devpedrofurquim.github.io/netlix-landing-page/ <ExternalLinkIcon mx="2px"/></Link>
                    </ListItem>
                    <ListItem>
                        <Meta>Stack</Meta>
                        <span>Html, Css, JavaScript</span>
                    </ListItem>
                    <ListItem>
                        <Meta>Github Repository</Meta>
                        <Link href='https://github.com/devpedrofurquim/netlix-landing-page' target='_blank'>Source Code<ExternalLinkIcon mx="2px"/></Link>
                    </ListItem>
                </List>
                <WorkImage src={"../../netflix-1.png"} alt={'Netflix'}/>
                <WorkImage src={"../../netflix-2.png"} alt={'Netflix'}/>
                <WorkImage src={"../../netflix-3.png"} alt={'Netflix'}/>
            </Container>
        </Layout>
    )
}

export default Project