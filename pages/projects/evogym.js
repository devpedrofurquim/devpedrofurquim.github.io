import { Container, Tag, Link, List, ListItem} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Title, WorkImage, Meta } from '../../components/work';
import Bio from '../../components/bio';
import Layout from '../../components/layouts/article';


const Project = () => {
    return (
        <Layout title="Evogym">
            <Container>
                <Title>
                    Evogym <Tag>2023</Tag>
                </Title>
                <Bio>
                Built with TypeScript, Next.js, Tailwind CSS, and Framer Motion, it&apos;s more than just a website it&apos;s a dynamic platform.
                Developed for studying purposes.
                </Bio>
                <List ml={4} my={4} gap={2} display="flex" flexDirection="column">
                    <ListItem>
                        <Meta>Website</Meta>
                        <Link href='https://evogym-website.vercel.app/' target='_blank'>https://evogym-website.vercel.app/ <ExternalLinkIcon mx="2px"/></Link>
                    </ListItem>
                    <ListItem>
                        <Meta>Stack</Meta>
                        <span>TypeScript, React, Next.JS, Tailwind, Framer Motion</span>
                    </ListItem>
                    <ListItem>
                        <Meta>Github Repository</Meta>
                        <Link href='https://github.com/devpedrofurquim/evogym-website' target='_blank'>Source Code<ExternalLinkIcon mx="2px"/></Link>
                    </ListItem>
                </List>
                <WorkImage src={"../../evogym-1.png"} alt={'Evogym'}/>
                <WorkImage src={"../../evogym-2.png"} alt={'Evogym'}/>
                <WorkImage src={"../../evogym-3.png"} alt={'Evogym'}/>
            </Container>
        </Layout>
    )
}

export default Project