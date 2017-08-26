import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject("routerStore") @observer
class PageRouter extends Component {
  render() {
  	const { component } = this.props.routerStore.currentContent;
    return (
      <div>
        { component }
      </div>
    );
  }
}

export default PageRouter;
