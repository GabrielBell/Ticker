import firebase, {firebaseRef} from 'app/firebase/';
import axios from 'axios';


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
export var fetchActiveHistoricalQuotes = (tickers) => {
	return (dispatch, getState) => {
		var vantageAPIKey = process.env.VANTAGE_API_KEY;	
		
		//you can only request one stock at a time
		tickers.forEach((ticker) => {
			var requestUrl=`http://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker.symbol}&apikey=${vantageAPIKey}`;
			console.log("Fetching historical data for : ", ticker.symbol);
			axios.get(requestUrl).then(function (res) {
				dispatch(setHistoricalData(ticker, res.data["Time Series (Daily)"] ));
			}, function (res) {
				console.log("Failed to make API request: ", res);
			}).catch((e) => {
				console.log(e);
			})

		})
		//dispatch(setHistoricalData(tickerSymbol));
		
	}
}

export var setHistoricalData = (ticker, data) => {
	var historicalData= {
		...ticker,
		entries: data
	}
	console.log(ticker.symbol, " Success :", data);
	return {
		type: 'ADD_TICKER_HISTORY',
		historicalData
	}
}

export var requestCurrentQuotes = (tickers) => {
	return (dispatch, getState) => {
		var tickerSymbols = tickers.map((ticker) => {return `"${ticker.symbol}"`});
		var tickerStr= tickerSymbols.join(',');
		//console.log("tickerStr: ", tickerStr);
		var endDate = getState().date.end.format("YYYY-MM-DD");
		var startDate = getState().date.end.subtract(1, 'months').format("YYYY-MM-DD");
		var vantageAPI="HY5M";
		
		/*
		returns JSON of {open, high, low, close, volume} every 60s	
		http://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=demo

		*/

	}
} 



export var startRemoveActiveTicker = (id) => {
	return (dispatch, getState) => {
		dispatch(removeActiveSt)
	}
}

export var addActiveTicker = (ticker) => {
	return {
		type: 'ADD_ACTIVE_TICKER',
		ticker
	};
}

export var startAddActiveTicker = (ticker) => {
	return (dispatch, getState) => {
		
		var {symbol, id, name} = ticker;
		dispatch(fetchActiveHistoricalQuotes(ticker));
		dispatch(addActiveStockTicker(ticker));
		var activeTickerRef = firebaseRef.child(`activeTickers/${ticker.id}`).set({
			name: name,
			symbol: symbol
		});
		console.log("Updating firebase activeTickers");
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

