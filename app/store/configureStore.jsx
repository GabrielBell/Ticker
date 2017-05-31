import * as redux from 'redux';
import thunk from 'redux-thunk';

import {historicalDataReducer, dateReducer, tickerHashReducer, searchReducer, activeTickersReducer} from 'reducers';

export var configure = (initialState = {}) => {
	var reducer = redux.combineReducers({
		date: dateReducer,
		tickerHash: tickerHashReducer,
		search: searchReducer,
		activeTickers: activeTickersReducer,
		historicalData: historicalDataReducer
		
	});

	var store = redux.createStore(reducer, initialState, redux.compose(
		redux.applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f

		));

	return store;
}