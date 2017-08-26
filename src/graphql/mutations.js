import gql from 'graphql-tag';


const upvotePostById = function(postId) {
	return {
		mutation: gql`
			mutation UpvotePost($postId: Int!) {
			  upvotePost(postId: $postId) {
			    id
			    votes
			  }
			}
		`,
		variables: {
			postId
		}
	}
}

export {
	upvotePostById,
}