import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import GeneratedCommand from './GeneratedCommand.js';

function App() {
  return (
    <div className="App container">
      <div className="row">
        <div className="col">
          <br/>
          <h1 className="display-4">
            <strong>okpy</strong>
            {' '}
            Command Generator
          </h1>
          <GeneratedCommand generatedCommand="python ok -q 03"/>
          {/*<CommandOptions />*/}
        </div>
      </div>
    </div>
  );
}

export default App;
