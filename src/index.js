import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';





// import hello from "./demo/example";
// import {sum} from "./demo/example";
// import {name} from "./demo/example";

// import hello, {sum,name} from "./demo/example";
// hello();

// import greeting, {sum,name} from "./demo/example";
// import greeting, {sum, name as newName} from "./demo/example";

// greeting(); // this is default hello




// sum(1,2);
// console.log(name);
// console.log(newName);



import * as properties from "./demo/example";
// console.log(properties);
// console.log(properties.default());
console.log(properties.sum(15,6));











ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
