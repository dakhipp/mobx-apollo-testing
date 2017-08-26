import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Loader from '../components/Loader';
import PostsTable from '../components/PostsTable';

@inject("authorStore", "postsStore") @observer
class AuthorDetail extends Component {
	renderDetails() {
		const {
  		firstName,
  		lastName,
  	} = this.props.authorStore.author;

		return (
			<div>
        <p>{firstName} {lastName}</p>
        <PostsTable />
      </div>

		);
	}

  render() {
  	const { author } = this.props.authorStore;
  	const { posts } = this.props.postsStore;

    return (
    	<div>
        <h2>Author Detail</h2>
	      { author && posts ? this.renderDetails() : <Loader /> }
  		</div>
    );
  }
}

export default AuthorDetail;
