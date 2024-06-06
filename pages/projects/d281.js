import { Container, Tag, Link, List, ListItem} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Title, WorkImage, Meta } from '../../components/work';
import Bio from '../../components/bio';
import Layout from '../../components/layouts/article';


const Project = () => {
    return (
        <Layout title="D281">
            <Container>
                <Title>
                    D281 <Tag>2024</Tag>
                </Title>
                <Bio>
                Fullstack Website developed for a brazilain software house built with TypeScript, Next.js, Tailwind CSS, Shadcn UI and Aceternity UI.
                </Bio>
                <List ml={4} my={4} gap={2} display="flex" flexDirection="column">
                    <ListItem>
                        <Meta>Website</Meta>
                        <Link href='https://d281.com.br/' target='_blank'>https://d281.com.br/<ExternalLinkIcon mx="2px"/></Link>
                    </ListItem>
                    <ListItem>
                        <Meta>Stack</Meta>
                        <span>TypeScript, React, Next.JS, Tailwind, Shadcn UI and Aceternity UI</span>
                    </ListItem>
                    <ListItem>
                        <Meta>Github Repository</Meta>
                        <Link href='https://github.com/devpedrofurquim/d281' target='_blank'>Source Code<ExternalLinkIcon mx="2px"/></Link>
                    </ListItem>
                </List>
                <WorkImage src={"../../d281-3.png"} alt={'D281'}/>
                <WorkImage src={"../../d281-2.png"} alt={'D281'}/>
                <WorkImage src={"../../d281.png"} alt={'D281'}/>
            </Container>
        </Layout>
    )
}

export default Project