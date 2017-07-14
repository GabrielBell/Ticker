import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import TickerApp from 'TickerApp'


export var TickerAppContainer = React.createClass({
	componentWillMount: function(){
		var {dispatch} = this.props;
		dispatch(actions.startFetchTickers());
		
	},

	render: function(){
		var {activeTickers, historicalData} = this.props;
		var renderWhenReady = () => {
			if(activeTickers && historicalData){
				if(activeTickers.length === historicalData.length){
					//console.log("WE are ready");
					return <TickerApp></TickerApp>
				}
			}
		}
		return(
			<div >
				{renderWhenReady()}
						
			</div>
			
		);
	}
});

export default Redux.connect(
	(state) => {
		return {
			activeTickers: state.activeTickers,
			historicalData: state.historicalData
		}
})(TickerAppContainer);