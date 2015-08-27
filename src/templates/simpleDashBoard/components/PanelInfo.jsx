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
		return (
			<ListGroup>
			{displayInfo.map((info, index) => {
				let modal = info.withSearch ? <UsersSearch labelButton={info.withSearch} /> : "";
				return (
					<ListGroupItem key={index} header={info.label}>
						<strong>{this.props.info.get(info.key)}</strong>
						{modal}
					</ListGroupItem>
				);
			})}
			</ListGroup>
		);	
	}
}

export default PanelInfo;
