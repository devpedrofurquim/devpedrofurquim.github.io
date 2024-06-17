import { Container, Tag, Link, List, ListItem} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Title, WorkImage, Meta } from '../../components/work';
import Bio from '../../components/bio';
import Layout from '../../components/layouts/article';


const Project = () => {
    return (
        <Layout title="Moonshiner">
            <Container>
                <Title>
                    Moonshiner <Tag>2024</Tag>
                </Title>
                <Bio>
                Moonshiner is a 2D mobile platform game with pixel art and a slower pace. A policeman and his ailing wife move to Moonshiner, where he must recover his stolen gun to prevent further murders.
                </Bio>
                <List ml={4} my={4} gap={2} display="flex" flexDirection="column">
                    <ListItem>
                        <Meta>Website</Meta>
                        <Link href='https://devpedrofurquim.github.io/moonshiner/' target='_blank'>https://devpedrofurquim.github.io/moonshiner/<ExternalLinkIcon mx="2px"/></Link>
                    </ListItem>
                    <ListItem>
                        <Meta>Stack</Meta>
                        <span>Flutter, Flame Engine</span>
                    </ListItem>
                    <ListItem>
                        <Meta>Github Repository</Meta>
                        <Link href='https://github.com/devpedrofurquim/moonshiner' target='_blank'>Source Code<ExternalLinkIcon mx="2px"/></Link>
                    </ListItem>
                </List>
                <WorkImage src={"../../moonshiner-4.png"} alt={'D281'}/>
                <WorkImage src={"../../moonshiner-3.png"} alt={'D281'}/>
                <WorkImage src={"../../moonshiner-2.png"} alt={'D281'}/>
            </Container>
        </Layout>
    )
}

export default Project