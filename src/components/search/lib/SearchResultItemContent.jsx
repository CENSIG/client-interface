import React from "react";
import ItemContentName from "./ItemContentName";

import style from "../style";

/**
 * Class which represent content of an item result
 * @author Jean BOUDET
 */
class SearchResultItemContent extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		var data = this.props.children;
		return (
			<ul style={style.resultContent}>
				<li style={style.resultContentItem}>
					<em><strong>{data.get("nameRef")}</strong></em>
				</li>
				<ItemContentName isref={data.get("isref")}>
					{data.get("name")}
				</ItemContentName>
			</ul>
		);	
	}
}

export default SearchResultItemContent;
