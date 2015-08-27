import React from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";

import UsersSearch from "./UsersSearch";

const displayInfo = [
	{ key: "nomVern", label: "Nom vernaculaire:"},
	{ key: "observations", label: "Nombre d'observations:" },
	{ key: "observateurs", label: "Nombre d'observateurs:", withSearch: "Rechercher un utilisateur"},
	{ key: "especes", label: "Nombre d'espèces observées:" },
	{ key: "communes", label: "Nombre de communes visitées:", withSearch: "Rechercher une communes"},
]

class PanelInfo extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		let props = this.props;
		var info = props.info;
		return (
			<ListGroup>
			{displayInfo.map((item, index) => {
				let modal = item.withSearch && info.get("rang") !== "OR"
					? <UsersSearch labelButton={item.withSearch} /> 
					: "";
				return (
					<ListGroupItem key={index} header={item.label}>
						<strong>{info.get(item.key)}</strong>
						{modal}
					</ListGroupItem>
				);
			})}
			</ListGroup>
		);	
	}
}

export default PanelInfo;
