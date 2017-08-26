import React, { Component } from 'react';

import Link from './Link';

class Nav extends Component {
  render() {
    return (
    	<nav>
    		<div className="nav-wrapper">
		      <ul id="nav-mobile" className="right hide-on-med-and-down">
		        <li>
		        	<Link to="/">
			      		Home
			      	</Link>
		        </li>
		        <li>
		        	<Link to="/about">
			      		About
			      	</Link>
		        </li>
		        <li>
			      	<Link to="/posts">
			      		Posts
			      	</Link>
		        </li>
		      </ul>
		    </div>
		  </nav>
    );
  }
}

export default Nav;
