import React from 'react';
import * as Redux from 'react-redux';
var actions = require('actions');

export var SearchResult = React.createClass({
	getInitialState: function(){
		return {
			hover: false
		}
	},
	toggleHover: function(){
		this.setState({hover: !this.state.hover})

	},
	render: function(){
	var {dispatch, name, symbol} = this.props;
	var {hover} = this.state;
	var hoverStyle= hover ? {backgroundColor: '#2199e8'} : {backgroundColor: '#fefefe'};
		return(
			<div className="searchResult" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} 
			style={hoverStyle} onClick={(e) => {
				e.preventDefault();
				dispatch(actions.setSearchText(symbol));
			}}>
				<p>{symbol + ': ' + name}</p>
			</div>
			);
	
	
	}
	
	
});

export default Redux.connect(
	(state) => {
		return {
			searchResults: state.search.filtered
		}
	})(SearchResult);