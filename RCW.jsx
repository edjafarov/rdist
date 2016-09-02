import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers } from 'redux'

class Remotify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
  }
  componentDidMount() {
    loadScript(this.props.path).then(()=>{
      this.setState({ loaded: true })
      let store = this.props.store;
      let reducers = store.reducers;
      reducers[/\/(\w*).js$/.exec(this.props.path)[1]] = window[/\/(\w*).js$/.exec(this.props.path)[1]].Store;
      store.replaceReducer(combineReducers(reducers));
    });
  }
  render() {
    if (!this.state.loaded) return <div>PLACEHOLDER</div>;
    if (this.state.loaded) return React.createElement(window[/\/(\w*).js$/.exec(this.props.path)[1]].default, this.props);
  }
}

export default function remoteWrapper(path, store) {
  return (props) => <Remotify path={path} {...props} store={store}></Remotify>
}

function loadScript(src) {
    return new Promise(function (resolve, reject) {
        var s;
        s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}
