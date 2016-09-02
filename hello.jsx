import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux';
import RCW from './RCW.jsx';


function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([ action.text ])
    default:
      return state
  }
}

var reducers = { todos }

var todoApp = combineReducers(reducers);

let store = createStore(todoApp)
store.reducers = reducers;

let RemoteComponent = RCW('http://localhost:3031/RemoteJSX.js', store);

class Hello extends React.Component {
  render() {
    return <div><h1>Hello</h1>
    {RemoteComponent({a:1,b:2})}
    </div>
  }
}

ReactDOM.render(<Provider store={store}>
  <Hello/>
  </Provider>
  , document.getElementById('hello'));
