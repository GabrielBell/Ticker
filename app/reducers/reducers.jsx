import moment from 'moment';


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
}



export var tickerHashReducer = (state= {}, action) => {
	switch(action.type){
		case 'FETCH_TICKERS':
			return { ...action.tickers };
		default:
			return state;
	}
}