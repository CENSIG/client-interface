import React from "react";

import style from "../style";

class HeaderSearchResult extends React.Component
{
	constructor(props) {
		super(props);	
	}

	shouldComponentUpdate(nextProps) {
		return false;	
	}

	render() {
		return (
			<li style={style.resultItem}>
				<ul style={style.resultContent}>
					<li style={style.resultContentItem}>Taxon référent</li>
					<li style={style.resultContentItem}>Nom</li>
				</ul>
			</li>
		)	
	}
}

export default HeaderSearchResult;
