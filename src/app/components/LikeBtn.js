import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject("postsStore") @observer
class LikeBtn extends Component {
	constructor(props) {
		super(props);
		
		this.handleUpvoteClick = this.handleUpvoteClick.bind(this);
	}
	
	handleUpvoteClick() {
		const { id } = this.props;
  	const { upvotePostById } = this.props.postsStore;

  	upvotePostById(id);
	}

  render() {
  	const { votes } = this.props;

    return (
    	<div>
	      <span>{votes}</span>
	    	<i 
					className="material-icons"
					style={{
						verticalAlign: 'sub',
						marginLeft: '5px'
					}}
					onClick={this.handleUpvoteClick}
				>
					thumb_up
				</i>
			</div>
    );
  }
}

export default LikeBtn;
