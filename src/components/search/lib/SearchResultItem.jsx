import React from "react";
import SearchResultItemContent from "./SearchResultItemContent";
import {NavLink}				 from "fluxible-router";

import style from "../style";

/**
 * Class which represent an result item
 * @author Jean BOUDET
 */
class SearchResultItem extends React.Component
{
	constructor(props) {
		super(props);	
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.content.get("cdnom") !== this.props.content.get("cdnom");
	}

	render() {
		return (
			<li style={style.resultItem}>
				<NavLink routeName="taxon" navParams={
					{ name: this.context.atlasUriName, cdnom: this.props.content.get("cdref") }
				}>
					<SearchResultItemContent>
						{this.props.content}
					</SearchResultItemContent>
				</NavLink>
			</li>
		);
	}
}

SearchResultItem.contextTypes = {
	atlasUriName: React.PropTypes.string
}

export default SearchResultItem;
