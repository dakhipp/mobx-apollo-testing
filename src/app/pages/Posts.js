import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Loader from '../components/Loader';
import PostsTable from '../components/PostsTable';

@inject("postsStore") @observer
class Posts extends Component {
  render() {
  	const { posts } = this.props.postsStore;

  	return (
      <div>
        <h2>Posts</h2>
        { posts.length > 0 ? <PostsTable /> : <Loader /> }
      </div>
    );
  }
}

export default Posts;
