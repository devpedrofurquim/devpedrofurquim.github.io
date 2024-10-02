import { Container, Tag, Link, List, ListItem} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Title, WorkImage, Meta } from '../../components/work';
import Bio from '../../components/bio';
import Layout from '../../components/layouts/article';


const Project = () => {
    return (
        <Layout title="Notify">
            <Container>
                <Title>
                    Notify <Tag>2023</Tag>
                </Title>
                <Bio>
                Notify is a minimalist web-based CRUD application that allows users to create, read, update, and delete notes. It was fully developed by me as my final project for Cs50.
                Notify is designed to enhance the user experience and provide seamless functionality. Below are the key features included in the project:
                </Bio>
                <List ml={4} my={4} gap={2} display="flex" flexDirection="column">
                    <ListItem>
                        <Meta>Website</Meta>
                        <Link href='https://notify-mg43.onrender.com/' target='_blank'>https://notify-mg43.onrender.com/ <ExternalLinkIcon mx="2px"/></Link>
                    </ListItem>
                    <ListItem>
                        <Meta>Stack</Meta>
                        <span>Python, Flask, Bootstrap, Postgresql</span>
                    </ListItem>
                    <ListItem>
                        <Meta>Github Repository</Meta>
                        <Link href='https://github.com/devpedrofurquim/notify' target='_blank'>Source Code<ExternalLinkIcon mx="2px"/></Link>
                    </ListItem>
                </List>
                <WorkImage src={"../../notify-01.png"} alt={'Notify'}/>
                <WorkImage src={"../../notify-02.png"} alt={'Notify'}/>
                <WorkImage src={"../../notify-03.png"} alt={'Notify'}/>
            </Container>
        </Layout>
    )
}

export default Project