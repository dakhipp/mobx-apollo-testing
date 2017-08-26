import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject("routerStore") @observer
class Link extends Component {
	constructor(props) {
		super(props);
		
		this.handleLinkClick = this.handleLinkClick.bind(this);
	}

	handleLinkClick(e) {
		e.preventDefault();
		this.props.routerStore.history.push(this.props.to);
	}

  render() {
    return (
      <a className="Link" onClick={this.handleLinkClick}>
      	{ this.props.children }
      </a>
    );
  }
}

export default Link;
