import React, { useState } from 'react';
import './App.css';
import { Button, Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

function App() {
  const [json, setJson] = useState('init 2');
  return (
    <main>
      <Layout className="layout" theme="dark">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ textAlign: 'center' }}
          >
            <Menu.Item key="1">Pollux</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
              <b>Editor</b>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae
            omnis dolore mollitia aliquid saepe rem aperiam non culpa suscipit
            nemo et animi, nulla nobis reiciendis? Consectetur tempora
            aspernatur dolores adipisci!
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </main>
  );
}

export default App;
