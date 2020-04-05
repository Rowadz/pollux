import { Layout, Menu } from 'antd';
import React from 'react';
const { Header } = Layout;

function HeaderComp() {
  return (
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
  );
}

export default HeaderComp;
