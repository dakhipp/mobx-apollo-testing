import React from 'react';

import client from '../client';
import { getAllPosts, getAuthorById } from '../graphql/queries';

import NavLayout from '../app/layouts/NavLayout';

import Home from '../app/pages/Home';
import About from '../app/pages/About';
import AuthorDetail from '../app/pages/AuthorDetail';
import Posts from '../app/pages/Posts';

import postsStore from '../store/PostsStore';
import authorStore from '../store/AuthorStore';

const routes = [
	{
		route: '/',
		layout: {
			name: 'NavLayout',
			component: <NavLayout />,
		},
		content: {
			name: 'Home',
			component: <Home />,
		}
	},
	{
		route: '/about',
		layout: {
			name: 'NavLayout',
			component: <NavLayout />,
		},
		content: {
			name: 'About',
			component: <About />,
		}
	},
	{
		route: '/authors/:id',
		layout: {
			name: 'NavLayout',
			component: <NavLayout />,
		},
		content: {
			name: 'AuthorDetail',
			component: <AuthorDetail />,
		},
		onEnter: (params) => {
			return client.query(getAuthorById(params.id))
	  	.then((res) => {
	  		const { id, firstName, lastName } = res.data.author;
	  		authorStore.setAuthor({ id, firstName, lastName });
	  		postsStore.setPosts(res.data.author.posts);
	  	})
	  	.catch(error => console.error(error));
		},
	},
	{
		route: '/posts',
		layout: {
			name: 'NavLayout',
			component: <NavLayout />,
		},
		content: {
			name: 'Posts',
			component: <Posts />,
		},
		onEnter: () => {
			client.query(getAllPosts())
	  	.then((res) => {
	  		postsStore.setPosts(res.data.posts)
	  	})
	  	.catch(error => console.error(error));
		},
	},
];

export default routes;
