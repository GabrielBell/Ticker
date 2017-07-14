var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var actions = require('actions');
const store = require('configureStore').configure();
import TickerAppContainer from 'TickerAppContainer';

// Load foundation
$(document).foundation();

// Fetch list of active ticker symbols

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Provider store= {store}>
  	<Router history={hashHistory}>
  		<Route path="/">
  			<IndexRoute component={TickerAppContainer}/>
  		</Route>
  	</Router>
  </Provider>,
  document.getElementById('app'));

