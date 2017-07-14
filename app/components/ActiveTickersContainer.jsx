import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import ActiveTickers from 'ActiveTickers';

export class ActiveTickersContainer extends Component {


	render() {
		var {activeTickerList, isLoading} = this.state;
		//console.log("Containers state: ", activeTickerList, isLoading);
		var renderActive = () => {
			if(!isLoading){
				return (
					<div>
						<ActiveTickers tickers={activeTickerList}/>
					</div>
					);
			}
		}
		return (
			<div className="activeTickersContainer">
				<h3>Active Tickers</h3>
				{renderActive()}
			</div>
			)
	}

};

export default Redux.connect((state) => {
	return {
		activeTickers: state.activeTickers
	}
})(ActiveTickersContainer);