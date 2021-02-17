import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Main from './Components/Main';
import { BrowserRouter as Router } from "react-router-dom";


function App() {
  return (
    <React.Fragment>
      
      <Router>
      	<Main />
      </Router>

    </React.Fragment>
  );
}

export default App;
