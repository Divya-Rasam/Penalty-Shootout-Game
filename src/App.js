// App.js
import React from 'react';
import { Provider } from 'react-redux';              // Provider is a special component that connects your whole app with Redux. It makes the Redux store available to all components.
import store from './store';                   // this imports the store (where your Redux state lives).
import Game from './Game';
import './styles.css';

function App() {
  return (
    <Provider store={store}>                    {/* wraps your whole app so all child components can talk to Redux. */}
      <div className="app">
        <Game />
      </div>
    </Provider>
  );
}

export default App;



// 👉 Summary: App.js just sets up your game inside Redux’s Provider.












// // App.js
// import React from 'react';
// import { Provider } from 'react-redux';
// import './styles.css'
// import store from './store';
// import Game from './Game';

// function App() {
//   return (
//     <Provider store={store}>
//       <div className="app">
//         <h1>Penalty Shootout Challenge</h1>
//         <Game />
//       </div>
//     </Provider>
//   );
// }

// export default App;










// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;
