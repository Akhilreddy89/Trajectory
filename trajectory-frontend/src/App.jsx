import React from 'react';
import axios from 'axios';
import './App.css';   
import { use } from 'react';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  , []);
  return (
    <div className="App">
      <h1>Trajectory Frontend</h1>
    </div>
  );
}

export default App;