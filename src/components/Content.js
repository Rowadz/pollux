import React, { useState } from 'react';
import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;

function ContentComp() {
  const [
    json,
    setJson,
  ] = useState(`Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae omnis
  dolore mollitia aliquid saepe rem aperiam non culpa suscipit nemo et
  animi, nulla nobis reiciendis? Consectetur tempora aspernatur dolores
  adipisci!`);
  return (
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <b>Editor</b>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">{json}</div>
    </Content>
  );
}

export default ContentComp;
