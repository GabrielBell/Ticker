import firebase, {firebaseRef} from 'app/firebase/';
import axios from 'axios';
import moment from 'moment';

//this is dispatched in TickerApp.componentWillMount
export var startFetchTickers = () => {
	return (dispatch, getState) => {
		
		var activeTickersRef = firebaseRef.child('activeTickers/');
		activeTickersRef.once('value').then((snapshot) => {
			var activeTickers = snapshot.val() || {};
			var parsedActives = [];
			Object.keys(activeTickers).forEach((activeId) => {
				parsedActives.push({
					id: activeId,
					...activeTickers[activeId]
				})
			});
			dispatch(fetchActiveTickers(parsedActives));
			dispatch(fetchTickerHash());
			dispatch(fetchActiveHistoricalQuotes(parsedActives));

		})
	}
};

export var fetchActiveTickers = (tickers) => {
	return {
		type: 'FETCH_ACTIVE_TICKERS',
		tickers
	}
};

export var fetchTickerHash = () => {
	return (dispatch, getState) => {
		var tickersRef = firebaseRef.child('tickerHash/');
		tickersRef.once('value').then((snapshot) => {
			
			var tickerHashObj = snapshot.val() || {};
			var tickerHash = [];
			Object.keys(tickerHashObj).forEach((key) => {
				//console.log("Key: ", key);
				tickerHash[key]= Object.keys(tickerHashObj[key]).map((id) => {return  tickerHashObj[key][id] })
				//console.log("Value: ", tickerHash[key]);
			})
			


			dispatch(setTickerHash(tickerHash));
		});
	}
};

export var setTickerHash = (tickerHash) => {
	return {
		type: 'SET_TICKERHASH',
		tickerHash
	}
};
// dispatched on initial load and when a new ticker is added
// by default it will fetch last 100 days unless you specify non-compact
export var fetchActiveHistoricalQuotes = (tickers) => {
	return (dispatch, getState) => {
		var vantageAPIKey = process.env.VANTAGE_API_KEY;	
		//console.log("OH BOY!", getState().historicalData === null);
		if(getState().historicalData === null){
			//console.log("Wiping it");
			dispatch(initializeActiveHistorical());
		}
		//you can only request one stock at a time
		tickers.forEach((ticker) => {
			var requestUrl=`http://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker.symbol}&apikey=${vantageAPIKey}`;
			//
			axios.get(requestUrl).then(function (res) {

				dispatch(setLastUpdated(moment()))
				dispatch(setHistoricalData(ticker, res.data["Time Series (Daily)"] ));
			}, function (res) {
				console.log("Failed to make API request: ", res);
			});

		})
		//dispatch(setHistoricalData(tickerSymbol));
		
	}
}
export var setLastUpdated = (lastUpdate) => {
	//console.log("INSIDE ACTION", lastUpdate)
	return {
		type: 'SET_LAST_UPDATED',
		lastUpdate
	}
}

export var initializeActiveHistorical = () => {
	return {
		type: 'INITIALIZE_TICKER_HISTORY'
	}
};

export var setHistoricalData = (ticker, data) => {
	var dayPrices= [];
	//1. open, 2. high, 3. low, 4. close, 5. volume
	Object.keys(data).forEach((day) => {
		dayPrices.unshift({date: day, close: data[day]["4. close"]});
	});
	
	var historicalData= {
		...ticker,
		dayPrices: dayPrices
	}
	
	return {
		type: 'ADD_TICKER_HISTORY',
		historicalData
	}
}

export var removeHistoricalData = (id) => {
	return {
		type: 'REMOVE_TICKER_HISTORY',
		id
	}
}



export var startRemoveActiveTicker = (id) => {
	return (dispatch, getState) => {
		dispatch(removeActiveTicker(id));
		dispatch(removeHistoricalData(id));
		var activeTickersRef = firebaseRef.child(`activeTickers/${id}`).remove();
	}
};

export var removeActiveTicker = (tickerId) => {
	return {
		type: 'REMOVE_ACTIVE_TICKER',
		tickerId
	};
}

export var addActiveTicker = (ticker) => {
	return {
		type: 'ADD_ACTIVE_TICKER',
		ticker
	};
}
/*

//


*/

export var startAddActiveTicker = (ticker) => {
	return (dispatch, getState) => {
		//generate this tickers rgba color value
		
			let red= Math.floor(Math.random() * (115)) +105,
			green= Math.floor(Math.random() * (100)) +120,
			blue= Math.floor(Math.random() * (100)) +120,
			alpha= 1;
		ticker["color"]= `rgba(${red},${green},${blue},${alpha})`;

		var {symbol, id, name, color} = ticker;
		var tickers= [];
		tickers.push(ticker);

		dispatch(fetchActiveHistoricalQuotes(tickers));
		dispatch(addActiveTicker(ticker));
		var activeTickerRef = firebaseRef.child(`activeTickers/${ticker.id}`).set({
			name: name,
			symbol: symbol,
			color: color
		});
		
		//dispatch(addVerifiedSymbol(code));
	};
};




export var setSearchText = (searchText) => {
	return {
		type: 'SET_SEARCH_TEXT',
		searchText
	}
};

export var setSearchFiltered = (filtered) => {
	return {
		type: 'SET_SEARCH_FILTERED',
		filtered
	}
}


export var startSearchFilter = (searchText) => {
	return (dispatch, getState) => {
		var filteredTickers= [];
		
		dispatch(setSearchText(searchText));
		if(searchText===""){

			dispatch(setSearchFiltered([]));
		}else{
			
			var lastSearch = getState().search.lastSearch;
			var lastResult = getState().search.filtered;
			if(lastSearch.length && searchText.indexOf(lastSearch) > -1){
				
				filteredTickers = lastResult.filter((ticker) => { return ticker.symbol.indexOf(searchText) > -1 })
			}else{
				// otherwise if previous is empty or current is brand new
				
				var tHash = getState().tickerHash[searchText.charAt(0)];
				filteredTickers= tHash.filter((ticker) => { return ticker.symbol.indexOf(searchText) !== -1 })
			} 
			
			dispatch(setSearchFiltered(filteredTickers));
		}
	}
}
export var clearSearch = () => {
	return {
		type: 'CLEAR_SEARCH'
	}
}



export var setStartDate = (start) => {
	return {
		type: 'SET_START_DATE',
		start
	}
};

export var setEndDate = (end) => {
	return {
		type: 'SET_END_DATE',
		end
	};
}

















/*export var createTickerHash = () => {
	return (dispatch, getState) => {
		var tickersRef = firebaseRef.child('tickers/');
		tickersRef.once('value').then((snapshot) => {
			
			var tickers = snapshot.val() || {};
			var parsedTickers = [];
			Object.keys(tickers).forEach((tickerId) => {
				parsedTickers.push({
					id: tickerId,
					...tickers[tickerId]
				});
			});
			var hashKeys="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
			var tickerHash= {};
			
			hashKeys.forEach((key) => {
				
				tickerHash[key]= parsedTickers.filter((obj) => {
					
					if(obj.symbol.charAt(0) === key){
						var tickerHashRef= firebaseRef.child(`tickerHash/${key}/${obj.id}`);
						tickerHashRef.push();
						tickerHashRef.set({ id: obj.id, name: obj.name, symbol: obj.symbol}); 
						return true
					}
					return false;
				});
				
				
			})

			dispatch(fetchTickers(tickerHash));
		});
	}
};*/

