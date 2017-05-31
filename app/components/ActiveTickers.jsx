import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';


export var ActiveTickers = React.createClass({

	render: function(){
		var {tickers, dispatch} = this.props;
		
		var renderActiveTickers = () => {
			return tickers.map((ticker) => {
				return (
					<div key={ticker.id} className="activeTicker">
						<h4>{ticker.name}</h4>
						<h6>{ticker.symbol}</h6>
						<button className="button danger removeTickerButton" onClick={(e) => {
							e.preventDefault();
							dispatch(actions.startRemoveActiveTicker(ticker.id));
						}}>Remove</button>
					</div>
					);
			})
		}
		return(
			<div className="active-ticker-wrapper">
				{renderActiveTickers()}
			</div>
		);
	}
});

export default Redux.connect()(ActiveTickers);