import React, { Component } from 'react';

import Nav from '../components/Nav';

class NavLayout extends Component {
  render() {
    return (
      <div>
      	<Nav />
        { this.props.children }
      </div>
    );
  }
}

export default NavLayout;
