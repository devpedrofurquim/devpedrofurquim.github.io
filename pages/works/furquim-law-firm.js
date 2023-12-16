import { Container, Tag, Link, List, ListItem} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Title, WorkImage, Meta } from '../../components/work';
import Bio from '../../components/bio';
import Layout from '../../components/layouts/article';


const Work = () => {
    return (
        <Layout title="Furquim Law Firm">
            <Container>
                <Title>
                    Furquim Law Firm <Tag>2022-</Tag>
                </Title>
                <Bio>
                A institutional website developed for Furquim Law Firm with on-demand technologies, SEO optimization, and Google Analytics. The website not only reflects the firm&apos;s prominence but also ensures a user-friendly experience.
                </Bio>
                <List ml={4} my={4} gap={2} display="flex" flexDirection="column">
                    <ListItem>
                        <Meta>Website</Meta>
                        <Link href='https://furquimadv.com.br/' target='_blank'>https://furquimadv.com.br/ <ExternalLinkIcon mx="2px"/></Link>
                    </ListItem>
                    <ListItem>
                        <Meta>Stack</Meta>
                        <span>Html, Css, Bootstrap, JavaScript</span>
                    </ListItem>
                    <ListItem>
                        <Meta>Github Repository</Meta>
                        <Link href='https://github.com/devpedrofurquim/law_firm_website' target='_blank'>Source Code<ExternalLinkIcon mx="2px"/></Link>
                    </ListItem>
                </List>
                <WorkImage src={"../../furquimadv.png"} alt={'Furquim'}/>
                <WorkImage src={"../../furquimadv-02.png"} alt={'Furquim'}/>
            </Container>
        </Layout>
    )
}

export default Work