import firebase, {firebaseRef} from 'app/firebase/';
import axios from 'axios';




export var startAddStock = (code) => {
	return (dispatch, getState) => {
		console.log("dispatching addStockCode: ", code);
		dispatch(setCurrentSymbol(code, true));
		//if it is a valid stock, write to firebase
		//dispatch(addVerifiedSymbol(code));
	};
};

export var setCurrentSymbol = (code, exists) => {
	return {
		type: 'SET_CURRENT_SYMBOL',
		code,
		exists
	}
}

export var addVerifiedSymbol = (code) => {
	return {
		type: 'ADD_VERIFIED_SYMBOL',
		code
	}
};


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





export var fetchTickers = (tickers) => {
	return {
		type: 'FETCH_TICKERS',
		tickers
	}
};

export var startFetchTickers = () => {
	return (dispatch, getState) => {
		var tickersRef = firebaseRef.child('tickers/');
		tickersRef.once('value').then((snapshot) => {
			console.log('Succesfully retrieved ticker list');
			var tickers = snapshot.val() || {};
			var parsedTickers = [];
			Object.keys(tickers).forEach((tickerId) => {
				parsedTickers.push({
					id: tickerId,
					...tickers[tickerId]
				});
			});
			var hashKeys="ABCDEFGHIJKLMNOPQRSTUVWXZY".split('');
			var tickerHash= {};
			
			hashKeys.forEach((key) => {
				tickerHash[key]= parsedTickers.filter((obj) => {
					if(obj.symbol.charAt(0) === key){ 
						return true
					}
					return false;
				});
				
				
			})

			dispatch(fetchTickers(tickerHash));
		})
	}
}