import React from "react";
import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { Button } from "antd";
import { Row } from "./components/lib";

/**
 * grid 和 flex 各自的应用场景
 * 1。要考虑，是一维布局还是二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2.是从内容出发还是从布局出发
 * 从内容出发：你先有一组内容（数量一般不固定），然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格（数量一般比较固定），然后再把元素往里面填充
 * 从内容出发：用flex
 * 从布局出发：用grid
 * @constructor
 */
export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h2>logo</h2>
          <h2> 项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Button onClick={() => logout}>登出</Button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
//grid-area 用来给grid子元素起名字
const Header = styled(Row)``;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  height: calc(100vh - 6rem);
`;
