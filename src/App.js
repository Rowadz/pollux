import React, { useState } from 'react';
import './App.css';

function App() {
  const [json, setJson] = useState('init 2');
  return (
    <main>
      <h1>{json}</h1>
    </main>
  );
}

export default App;
