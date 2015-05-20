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
			<div className="panel-info">
				<ul className="card flex fjb">
					<li>
						<span className="stats">{this.props.info.observations}</span>
						<span>Observations</span>
					</li>
					<li>
						<span className="stats">{this.props.info.especes}</span>
						<span>Espèces</span>
					</li>
					<li>
						<span className="stats">{this.props.info.observateurs}</span>
						<span>Observateurs</span>
					</li>
					<li>
						<span className="stats">{this.props.info.communes}</span>
						<span>Communes</span>
					</li>
				</ul>
			</div>
		);
	}
}

export default PanelInformations;


