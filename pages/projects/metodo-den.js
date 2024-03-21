import { Container, Tag, Link, List, ListItem} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Title, WorkImage, Meta } from '../../components/work';
import Bio from '../../components/bio';
import Layout from '../../components/layouts/article';


const Project = () => {
    return (
        <Layout title="Método Den">
            <Container>
                <Title>
                    Método Den <Tag>2024</Tag>
                </Title>
                <Bio>
                A Landing Page developed for a Brazilian Coaching Course with React and Tailwind. The Landing Page ensures a user-friendly experience and is responsive to all mobile devices.
                </Bio>
                <List ml={4} my={4} gap={2} display="flex" flexDirection="column">
                    <ListItem>
                        <Meta>Website</Meta>
                        <Link href='https://www.metododen.com.br/' target='_blank'>https://www.metododen.com.br/ <ExternalLinkIcon mx="2px"/></Link>
                    </ListItem>
                    <ListItem>
                        <Meta>Stack</Meta>
                        <span>React, Javascript, Tailwind</span>
                    </ListItem>
                </List>
                <WorkImage src={"../../metodo-den-02.png"} alt={'Método Den'}/>
                <WorkImage src={"../../metodo-den-03.png"} alt={'Método Den'}/>
            </Container>
        </Layout>
    )
}

export default Project