import { Container, Tag, Link, List, ListItem} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Title, WorkImage, Meta } from '../../components/work';
import Bio from '../../components/bio';
import Layout from '../../components/layouts/article';

const Work = () => {
    return (
        <Layout title="Rangu">
            <Container>
            <Title>
                Rangu <Tag>2023</Tag>
            </Title>
            <Bio>
                A recipes web application developed with new technologies 
                where users can navigate and search through a vast repository of 
                thousands of receipts. It consumes data from the Spoonacular API.
            </Bio>
            <List ml={4} my={4} gap={2} display="flex" flexDirection="column">
                    <ListItem>
                        <Meta>Website</Meta>
                        <Link href='https://devpedrofurquim.github.io/rangu-app/' target='_blank'>https://devpedrofurquim.github.io/rangu-app/<ExternalLinkIcon mx="2px"/></Link>
                    </ListItem>
                    <ListItem>
                        <Meta>Stack</Meta>
                        <span>React, Typescript, Tailwind CSS</span>
                    </ListItem>
                    <ListItem>
                        <Meta>Github Repository</Meta>
                        <Link href='https://github.com/devpedrofurquim/rangu-app' target='_blank'>Source Code<ExternalLinkIcon mx="2px"/></Link>
                    </ListItem>
                    <WorkImage src={"../../rangu.png"} alt={'Rangu'}/>
                    <WorkImage src={"../../rangu-02.png"} alt={'Rangu'}/>
                    <WorkImage src={"../../rangu-3.png"} alt={'Rangu'}/>
                </List>
            </Container>
        </Layout>
    )
}

export default Work