import React	from "react";

/**
 * Display informations about taxon
 * @author Jean BOUDET
 */
class PanelInformations extends React.Component
{
	constructor(props, context) {
		super(props);
	}

	render() {
		return (
			<div>
				<ul>
					<li>Nom: {this.props.info.nom}</li>
					<li>Phylum: {this.props.info.phylum}</li>
					<li>Classe: {this.props.info.classe}</li>
					<li>Nombre d'observations: {this.props.info.observations}</li>
					<li>Nombre d'especes: {this.props.info.especes}</li>
					<li>Nombre de communes: {this.props.info.communes}</li>
				</ul>
			</div>
		);
	}
}

export default PanelInformations;


