import React from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import InfoStore from "../../../stores/InfoStore";
import {connectToStores}  from "fluxible/addons";

const displayInfo = [
	{ key: "nomVern", label: "Nom vernaculaire:" },
	{ key: "observations", label: "Nombre d'observations:" },
	{ key: "observateurs", label: "Nombre d'observateurs:" },
	{ key: "especes", label: "Nombre d'espèces observées:" },
	{ key: "communes", label: "Nombre de communes visitées:" },
]

class PanelInfo extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		return (
			<ListGroup>
			{displayInfo.map(info => {
				return (
					<ListGroupItem header={info.label}>
						<strong>{this.props.info.get(info.key)}</strong>
					</ListGroupItem>
				);
			})}
			</ListGroup>
		);	
	}
}

PanelInfo = connectToStores(PanelInfo, [ InfoStore ], (stores, props) => {
	return {
		info: stores.InfoStore.getState()
	}
});

export default PanelInfo;
