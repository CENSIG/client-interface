import React from "react";

/**
 * Element for search taxon
 * @author Jean BOUDET
 */
class Search extends React.Component
{
	constructor(props) {
		super(props);
	}

	render() {
		var placeholder = "Recherchez un taxon spécifique dans les "+this.props.label;
		return (
			<div className="card search">
				<input type="search" placeholder={placeholder} />
			</div>
		);
	}
}

export default Search;
