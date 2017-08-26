import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Link from '../components/Link';
import Loader from '../components/Loader';
import LikeBtn from '../components/LikeBtn';

@inject("postsStore") @observer
class Posts extends Component {
	constructor(props) {
		super(props);
		
		this.renderPosts = this.renderPosts.bind(this);
	}

	componentWillUnmount() {
		this.props.postsStore.reset();
	}

	renderTable() {
		return (
			<table className="striped" style={{maxWidth: '850px', margin: 'auto'}}>
        <thead>
          <tr>
              <th>Post Name</th>
              <th>Author Name</th>
              <th>Vote Count</th>
          </tr>
        </thead>
        <tbody>
     		{ this.renderPosts() }
     		</tbody>
    	</table>
    )
	}

	renderPosts() {
		const { posts } = this.props.postsStore;

		return posts.map((post, ind) => {
			return (
				<tr key={ind}>
          <td>{post.title}</td>
          <td>
          	<Link to={`/authors/${post.author.id}`}>
          		{post.author.firstName} {post.author.lastName}
          	</Link>
          </td>
          <td>
          	<LikeBtn id={post.id} votes={post.votes} />
          </td>
        </tr>
			)
		});
	}

  render() {
  	const { posts } = this.props.postsStore;

  	return (
      <div>
        { posts.length > 0 ? this.renderTable() : <Loader /> }
      </div>
    );
  }
}

export default Posts;
