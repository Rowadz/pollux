import React, { useState } from 'react';
import './App.css';
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';

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
          Made by <b>Rowad</b>
          <a
            href="https://github.com/MohammedAl-Rowad"
            target="_blank"
            without
            rel="noopener noreferrer"
          >
            <GithubOutlined style={{ fontSize: '20px', color: '#08c' }} />
          </a>
          <b>/</b>
          <a
            href="https://www.linkedin.com/in/mohammed-al-rowad/"
            target="_blank"
            without
            rel="noopener noreferrer"
          >
            <LinkedinOutlined style={{ fontSize: '20px', color: '#08c' }} />
          </a>
        </Footer>
      </Layout>
    </main>
  );
}

export default App;
