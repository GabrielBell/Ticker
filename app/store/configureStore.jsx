import * as redux from 'redux';
import thunk from 'redux-thunk';

import {dateReducer, tickerHashReducer} from 'reducers';

export var configure = (initialState = {}) => {
	var reducer = redux.combineReducers({
		date: dateReducer,
		tickerHash: tickerHashReducer
		
	});

	var store = redux.createStore(reducer, initialState, redux.compose(
		redux.applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f

		));

	return store;
}