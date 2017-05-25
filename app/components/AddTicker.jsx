import React from 'react';
import * as Redux from 'react-redux';
var actions = require('actions');

export var AddTicker = React.createClass({
	getInitialState: function(){
		return {
			searchText: '',
			filteredSymbols: []
		};
	},
	handleSubmit: function(e){
		e.preventDefault();
		var {dispatch, tickerHash} = this.props;
		var tickerSymbol = this.refs.tickerSymbolSearch.value.toUpperCase();
		this.refs.tickerSymbolSearch.value='';
		//verify ticker symbol and add ticker symbol to state
		//dispatch(actions.startAddStock(tickerSymbol));
		// fetch 1Y of data
		
	},
	handleInput: function(e){
		e.preventDefault();
		var {tickerHash} = this.props;
		var tickerSymbol = this.refs.tickerSymbolSearch.value.toUpperCase();
		this.refs.tickerSymbolSearch.value='';
		console.log(/^([A-Z]+[\.\-]?[A-Z]*)/.test(tickerSymbol));
		if(tickerSymbol.charAt(0)){
			var re= new RegExp(tickerSymbol);
			var allTickers = tickerHash[tickerSymbol.charAt(0)];
			/*var filteredTickers= allTickers.filter((ticker) => {

			});*/

		}
		this.setState({
			searchText: tickerSymbol
		});
	},	
	render: function(){
		var {searchText, filteredSymbols} = this.state;
		var {tickerHash} = this.props;
		console.log("SearchText set: ", searchText);
		return(
			<div className="add-ticker-container">
				<h6 className="add-ticker-title">Syncs in realtime.</h6>
				<div className="form-wrapper">
					<div className="row">
						<div className="large-10 large-centered columns">
							<form ref="form" onSubmit={this.handleSubmit} className="code-form">
								<div className="input-group">
									<input type="text" className="input-group-field" ref="tickerSymbolSearch" placeholder="Stock code" value={searchText} onChange={this.handleInput}/>
									<div className="input-group-button">
										<input type="submit" className="button" value="Add"/>
									</div>
								</div>
							</form>
						</div>
					</div>
					
				</div>
			</div>
		);
	}
});

export default Redux.connect(
	(state) => {
		return {
			tickerHash: state.tickerHash
		}
	})(AddTicker);