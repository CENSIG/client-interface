import React	from "react";
import shouldPureComponentUpdate from "react-pure-render/function";

/**
 * Display informations about taxon
 * @author Jean BOUDET
 */
class PanelInformations extends React.Component
{
	constructor(props, context) {
		super(props);
	}

	shouldComponentUpdate = shouldPureComponentUpdate

	render() {
		return (
			<div className="panel-info">
				<ul className="card flex fjb">
					<li>
						<span className="stats">{this.props.info.get("observations")}</span>
						<span>Observations</span>
					</li>
					<li>
						<span className="stats">{this.props.info.get("especes")}</span>
						<span>Espèces</span>
					</li>
					<li>
						<span className="stats">{this.props.info.get("observateurs")}</span>
						<span>Observateurs</span>
					</li>
					<li>
						<span className="stats">{this.props.info.get("communes")}</span>
						<span>Communes</span>
					</li>
				</ul>
			</div>
		);
	}
}

export default PanelInformations;


