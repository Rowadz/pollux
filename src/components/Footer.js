import React from 'react';
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
const { Footer } = Layout;

function FooterComp() {
  return (
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
  );
}

export default FooterComp;
