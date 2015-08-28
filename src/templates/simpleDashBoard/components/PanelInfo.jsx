import React from "react";
import shouldPureComponentUpdate from "react-pure-render/function";
import {ListGroup, ListGroupItem} from "react-bootstrap";

import UsersSearch from "./UsersSearch";

const displayInfo = [
	{ key: "nomVern", label: "Nom vernaculaire:"},
	{ key: "observations", label: "Nombre d'observations:" },
	{ key: "observateurs", label: "Nombre d'observateurs:", withSearch: " (Voir les observateurs)"},
	{ key: "especes", label: "Nombre d'espèces observées:" },
	{ key: "communes", label: "Nombre de communes visitées:"}
];

class PanelInfo extends React.Component
{
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate = shouldPureComponentUpdate

	_getSearch(key, label) {
		let res, props = this.props;
		if (key === "observateurs") {
			res = <UsersSearch
				alphabet={props.alphabetObservateurs}
				cdnom={props.info.get("id")}
				taxonName={props.info.get("nom")}
				labelButton={label}
			/>;
		}
		return res;
	}

	render() {
		var props = this.props;
		var info = props.info;
		return (
			<ListGroup>
			{displayInfo.map((item, index) => {
				let modal = item.withSearch && info.get("rang") !== "OR"
					? this._getSearch(item.key, item.withSearch)
					: "";
				return (
					<ListGroupItem key={index} header={item.label}>
						<div>
							<strong>{info.get(item.key)}</strong>
							{modal}
						</div>
					</ListGroupItem>
				);
			})}
			</ListGroup>
		);	
	}
}

export default PanelInfo;
