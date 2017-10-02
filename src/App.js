import React, { Component } from 'react';
import './App.css';

import ProjectList from './components/ProjectList/ProjectList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="title">
            <h2>Task Management</h2>
          </div>
        </div>
        <div className="project-list">
          <ProjectList/>
        </div>
      </div>
    );
  }
}

export default App;