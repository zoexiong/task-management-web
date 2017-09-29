import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ProjectList from './components/ProjectList/ProjectList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="title">
            <img src={logo} className="App-logo" alt="logo" />
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

// import uniqueId from 'lodash/uniqueId';
// import React from 'react';
// import Sortable from 'react-sortablejs';

// Functional Component
// const SharedGroup = ({ items }) => {
//     items = items.map(val => (<li key={uniqueId()} data-id={val}>{val}</li>));
//
//     return (
//         <Sortable
//             // See all Sortable options at https://github.com/RubaXa/Sortable#options
//             options={{
//                 group: 'shared'
//             }}
//             tag="ul"
//         >
//             {items}
//         </Sortable>
//     );
// };
//
// export default SharedGroup;