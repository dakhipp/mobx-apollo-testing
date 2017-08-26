import gql from 'graphql-tag';


const getAllPosts = function() {
	return {
		query: gql`
			query Posts {
			  posts {
			    id
			    title
			    votes
			    author {
			    	id
			    	firstName
			    	lastName
			    }
			  }
			}
		`
	}
}

// have to refetch the same user info (id, fn, ln) in order to reuse component without weird logic check
// because without refetching same info the data structure between the two queries chagnes
const getAuthorById = function(id) {
	return {
		query: gql`
			query Author($id: Int!) {
		  	author(id: $id) {
			    id
			    firstName
			    lastName
			    posts {
			      id
			      title
			      votes
			      author {
			      	id
			      	firstName
			      	lastName
			      }
			    }
		  	}
		  }
		`,
		variables: {
			id: parseInt(id, 0),
		}
	}
}

export {
	getAllPosts,
	getAuthorById
}