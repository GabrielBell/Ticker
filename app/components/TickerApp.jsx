import React from 'react';
import * as Redux from 'react-redux';
import TickerHeader from 'TickerHeader';
import TickerChart from 'TickerChart';
import AddTicker from 'AddTicker';
import ActiveTickersContainer from 'ActiveTickersContainer';
import * as actions from 'actions';


export var TickerApp = React.createClass({
	componentWillMount: function(){
		var {dispatch} = this.props;
		dispatch(actions.startFetchTickers());
		
	},

	render: function(){
		var {activeTickers} = this.props;
		
		return(
			<div className="tickerapp-body">
				<div className="row">
					<div className="column large-centered large-11 children-container">
						<h6 className="page-title">Stocks</h6>
						<TickerHeader></TickerHeader>
						<TickerChart></TickerChart>
						<AddTicker></AddTicker>
						<ActiveTickersContainer/>
					</div>
				</div>
			</div>
		);
	}
});

export default Redux.connect(
	(state) => {
		return {
			activeTickers: state.activeTickers
		}
})(TickerApp);