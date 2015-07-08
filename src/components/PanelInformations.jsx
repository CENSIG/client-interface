import React	from "react";
import {connectToStores} from "fluxible/addons";
import InfoStore from "../stores/InfoStore";

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

PanelInformations = connectToStores(PanelInformations, [ InfoStore ], (stores, props) => {
		return {
			info: stores.InfoStore.getState()	
		}
});

export default PanelInformations;


