import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


// import React from 'react';
// import ReactDOM from 'react-dom';
// import SharedGroup from './App';
//
// const App = (props) => {
//     return (
//         <div>
//             <div className="block-list">
//             <SharedGroup
//                 items={['Apple', 'Banaba', 'Cherry', 'Grape']}
//             />
//                 </div>
//
//             <div className="block-list">
//             <SharedGroup
//                 items={['Lemon', 'Orange', 'Pear', 'Peach']}
//             />
//                 </div>
//         </div>
//     );
// };
//
// ReactDOM.render(<App />, document.getElementById('root'));