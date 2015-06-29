import React from "react";
import Radium from "radium";
import style from "../style";

/**
 * Class which represent search input
 * @author Jean BOUDET
 */
class SearchInput extends React.Component
{
	constructor(props) {
		super(props);	
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.placeholder !== this.props.placeholder;	
	}

	render() {
		return (
			<div style={style.searchInput}>
				<input style={style.input} type="search" placeholder={this.props.placeholder} onKeyUp={this.props._onKeyUp}/>
			</div>
		);	
	}
}

SearchInput = Radium(SearchInput);

export default SearchInput;
