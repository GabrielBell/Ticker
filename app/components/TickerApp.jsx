import React from 'react';
import * as Redux from 'react-redux';
import TickerChartContainer from 'TickerChartContainer';
import TickerChart from 'TickerChart';
import AddTicker from 'AddTicker';
import ActiveTickers from 'ActiveTickers';
import * as actions from 'actions';


export var TickerApp = React.createClass({
	
	render: function(){
		//var {activeTickers} = this.props;
		/*var renderChart = ()=> {
			if(activeTickers.length > 0){
				return <TickerChartContainer/>
			}
		}*/
		return(
			<div className="tickerapp-body">
				<div className="row">
					<div className="column large-centered large-12 children-container">
						<TickerChartContainer/>
						<AddTicker></AddTicker>
						<ActiveTickers/>
					</div>
				</div>
			</div>
		);
	}
});

export default Redux.connect()(TickerApp);