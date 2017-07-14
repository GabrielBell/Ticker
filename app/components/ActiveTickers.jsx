import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';


export var ActiveTickers = React.createClass({

	render: function(){
		var {activeTickers, dispatch} = this.props;
		
		var renderActiveTickers = () => {
			if(activeTickers.length > 0 ){
				return activeTickers.map((ticker) => {
					var {red,green,blue,alpha} = ticker.color;
					var style= {
						color: ticker.color					
					}
					return (
						<div key={ticker.id} className="activeTicker" style={style}>
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
		}
		return(
			<div className="activeTickersContainer">
				<div className="activeTickersWrapper">
					{renderActiveTickers()}
				</div>
				
			</div>
		);
	}
});

export default Redux.connect((state) => {
	return {
		activeTickers: state.activeTickers
	}
})(ActiveTickers);