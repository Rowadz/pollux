import React from 'react';
import './App.css';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import { Layout } from 'antd';

function App() {
  return (
    <main>
      <Layout className="layout" theme="dark">
        <Header />
        <Content />
        <Footer />
      </Layout>
    </main>
  );
}

export default App;
