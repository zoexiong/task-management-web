// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


import React from 'react';
import ReactDOM from 'react-dom';
import SharedGroup from './App';

const App = (props) => {
    return (
        <div>
            <SharedGroup
                items={['Apple', 'Banaba', 'Cherry', 'Grape']}
            />
            <br/>
            <SharedGroup
                items={['Lemon', 'Orange', 'Pear', 'Peach']}
            />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));