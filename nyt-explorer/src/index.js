import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';



const btn = document.getElementById("btn")

btn.addEventListener('click', () =>{
const root = document.getElementById("root");
ReactDOM.unmountComponentAtNode(root);
    ReactDOM.render( <App /> , root);
    registerServiceWorker();

})