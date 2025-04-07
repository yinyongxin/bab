import { Button, Container, Group, Text, Title } from '@mantine/core';
import { Illustration } from './Illustration';
import classes from './nothingFound.module.css';
import { Link } from 'react-router-dom';
import appConfig from '@/configs/app.config';

const { authenticatedEntryPath } = appConfig;
export default function NothingFound() {
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>这里什么也没有</Title>
          <Text
            c="dimmed"
            size="lg"
            ta="center"
            className={classes.description}
          >
            您试图打开的页面不存在。您可能已经误解了 地址或页面已移至另一个URL。
          </Text>
          <Group justify="center">
            <Link to={authenticatedEntryPath}>
              <Button size="md">点击我回到主页</Button>
            </Link>
          </Group>
        </div>
      </div>
    </Container>
  );
}
