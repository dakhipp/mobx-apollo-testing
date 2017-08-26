import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject("routerStore") @observer
class LayoutRouter extends Component {
  render() {
  	const { component } = this.props.routerStore.currentLayout;
    return (
      <div>
        	{ component }
      </div>
    );
  }
}

export default LayoutRouter;
