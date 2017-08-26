import { observable, computed, action, autorun, toJS } from 'mobx';
import createHistory from 'history/createBrowserHistory';
import _ from 'lodash';

import routes from '../app/routes';

/*
	- currently handles paths in this format: /page-name/arg1/arg2
	- 'history' or location changes are monitored and update the currently showing component & data
	- 'history' or location can be updated using RouterStore.history.push('/page-name')
	- route pattern from ./app/routes is diffed with acctual route and an object containing the 
		properites from the route pattern are passed to the onEnter function in ./app/routes
*/

class RouterStore {
	constructor() {
		// listen for location changes, and update current currentRouteObj if needed
    this.history.listen((location, action) => {
    	const newPath = location.pathname;
		  if(!this.isMatchingRoute(newPath)) {
		  	this.updateCurrentRouteValues(newPath);
		  }
		});

    // set initial route obj on new page load
		this.updateCurrentRouteValues(window.location.pathname);

		// run the onEnter function attached to the object from ./app/routes
		// function runs right when page loads and when RouterStore data changes
		// its current route object
		autorun(() => {
			if(this.currentOnEnter) {
				this.currentOnEnter(this.currentPathObj);
			}
		})
	}

	// history object, makes routing capabilites avilable on routerStore object
	history = createHistory();

	// holds pieces of the current route pathname split into an array
	@observable currentSplitPathname = [];
	// hold current path pattern pieces split into an array, returned from ./app/routes
	@observable currentSplitPathPattern = [];
	// derived by fetching an object from ./app/routes
	@observable currentRoute = null;
	@observable currentLayout = {
		name: null,
		component: null,
	};
	@observable currentContent = {
		name: null,
		component: null,
	};
	@observable currentOnEnter = null;

	// used to diff the current path with the path pattern and return an object containing named values
	// this object is passed into the onEnter function returned from ./app/routes
	@computed get currentPathObj() {
		return this.currentSplitPathPattern.slice().reduce((accum, obj, ind) => {
			if(ind !== 0) {
				accum[toJS(this.currentSplitPathPattern)[ind].substring(1)] = toJS(this.currentSplitPathname)[ind];
			}
			return accum;
		}, {})
	}

	// used internally (within RouterStore) to react to history changes
	@action updateCurrentRouteValues(route) {
		// [0] = page, matchs number of arguments in the patern with the number of arguments in the current pathname
		this.currentSplitPathname = route.split('/').slice(1);

		// find matching route object from './app/routes' by matching page name and number of arguments
		const routeObj =  _.find(routes, (o) => {
			return this.isMatchingRoute(o.route);
		});

		// if match is found update current route values with it, else go do default (home for now)
		// *** may want to replace with default 404 later ***
		if(routeObj) { 
			this.updateValuesFromRouteObj(routeObj);
		} else {
			const defaultRouteObj = _.filter(routes, (o) => { return o.route === '/' })[0];
			this.updateValuesFromRouteObj(defaultRouteObj);
		}
	}

	// only update route values if they change, protects against over re-rendering UI
	// *** had to add extra name feild to route objects in order to test eqality of components ***
	@action updateValuesFromRouteObj(routeObj) {
		if(routeObj.route !== this.currentRoute) {
			this.currentRoute = routeObj.route;
			this.currentSplitPathPattern = routeObj.route.split('/').slice(1)
		}
		if(routeObj.layout.name !== this.currentLayout.name) {
			this.currentLayout = routeObj.layout;
		}
		if(routeObj.content.name !== this.currentContent.name) {
			this.currentContent = routeObj.content;
		}
		if(routeObj.onEnter !== this.currentOnEnter) {
			this.currentOnEnter = routeObj.onEnter
		}
	}

	// used to fetch matching route object from ./app/routes by comparing to
	// and to only update history if not a matching route, ie only on new route click
	isMatchingRoute(route) {
		const splitRoute = route.split('/').slice(1);
		return splitRoute[0] === this.currentSplitPathname[0] && splitRoute.length === this.currentSplitPathname.length;
	}
}

export default new RouterStore();
