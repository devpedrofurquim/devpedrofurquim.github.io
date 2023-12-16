import { Container, Tag, Heading} from '@chakra-ui/react';
import { Title } from '../../components/course';
import Layout from '../../components/layouts/article';

const Course = () => {
    return (
        <Layout title="Mastering Vanilla JS">
            <Container>
                <Title>
                Setting up LazyVim <Tag>2024</Tag>
                </Title>
                <Heading as="h2">This course is being prepared.</Heading>
            </Container>
        </Layout>
    )
}

export default Course