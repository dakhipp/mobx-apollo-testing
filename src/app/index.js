import React, { Component } from 'react';

import LayoutRouter from './layouts/LayoutRouter';
import PageRouter from './pages/PageRouter';

import '../scss/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<LayoutRouter />
        <PageRouter />
      </div>
    );
  }
}

export default App;
