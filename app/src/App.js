import React, { Component } from 'react';
import Routes from './router';

class App extends Component  {

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm">
          </div>
          <Routes/>
          <div className="col-sm">
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
