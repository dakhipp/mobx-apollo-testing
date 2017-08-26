import { observable, action, toJS } from 'mobx';
import _ from 'lodash';

import client from '../client';
import { upvotePostById } from '../graphql/mutations';

class PostsStore {
	constructor() {
		this.upvotePostById = this.upvotePostById.bind(this);
	}

  @observable posts = [];

  @action upvotePostById(id) {
  	this.incrementPostById(id);
  	return client.mutate(upvotePostById(id))
  	.catch((error) => {
  		console.error(error);
  		this.decrementPostById(id);
  	});
  }

  @action setPosts(postsArray) {
  	this.posts = postsArray;
  }

  @action reset() {
  	this.posts = [];
  }

  @action incrementPostById(id) {
  	const index = _.findIndex(toJS(this.posts), { id });
  	this.posts[index].votes = this.posts[index].votes + 1;
  }

  @action decrementPostById(id) {
  	const index = _.findIndex(toJS(this.posts), { id });
  	this.posts[index].votes = this.posts[index].votes - 1;
  }
}

export default new PostsStore();
