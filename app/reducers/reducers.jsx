import moment from 'moment';


export var historicalDataReducer= (state=[], action) => {
	switch(action.type){
		case 'ADD_TICKER_HISTORY':
			return [...state, action.historicalData];
		case 'REMOVE_TICKER_HISTORY':
			return state.filter((item) => { return item.id !== action.id })
		default:
			return state
	}
}




export var activeTickersReducer= (state=[], action) => {
	switch(action.type){
		case 'ADD_ACTIVE_TICKER':
			return [
			...state, 
			action.ticker	
			];
		case 'REMOVE_ACTIVE_TICKER':
			return state.filter((activeTicker) => { return activeTicker.id !== action.tickerId })
		case 'FETCH_ACTIVE_TICKERS':
			return [...action.tickers];
		default:
			return state;
	}
	
}

export var searchReducer= (state={searchText:'', filtered: [], lastSearch:null, prevResults: []}, action) => {
	switch(action.type){
		case 'SET_SEARCH_TEXT':
			return {
				...state,
				lastSearch: state.searchText,
				searchText: action.searchText
			};
		case 'SET_SEARCH_FILTERED':
			return {
				...state,
				filtered: action.filtered,
				prevResults: [...state.prevResults, {prevSearch: state.searchText,	prevResult: action.filtered	}]
			};
		case 'CLEAR_SEARCH':
			return {searchText:'', filtered: [], lastSearch:null, prevResults: []};
		default:
			return state;
	}
}


export var dateReducer = (state={end: moment(), start: moment().subtract(1, 'y')}, action) => {
	switch(action.type){
		case 'SET_START_DATE':
			return {
				...state,
				start: action.start
			}
		case 'SET_END_DATE':
			return {
				...state,
				end: action.end
			}
		default:
			return state;
	}
};





export var tickerHashReducer = (state= {}, action) => {
	switch(action.type){
		case 'SET_TICKERHASH':
			return { ...action.tickerHash };
		default:
			return state;
	}
}