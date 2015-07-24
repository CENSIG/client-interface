import React from "react";
import {TabbedArea, TabPane} from "react-bootstrap";
import {connectToStores}  from "fluxible/addons";

import PanelInfo from "./PanelInfo";
import InfoStore from "../../../stores/InfoStore";

class Monographies extends React.Component
{
	constructor(props) {
		super(props);	
	}
	
	_getGeneral(info) {
		return (
			<PanelInfo info={info} />
		);
	}

	render() {
		if (this.props.monographies.size === 0) {
			return (
				this._getGeneral(this.props.general)
			);
		}
		return (
			<TabbedArea>
				<TabPane eventKey={1} tab="Général">
					{this._getGeneral(this.props.general)}
				</TabPane>
				{this.props.monographies.map((mono, index) => {
					let bloc = mono.get("bloc");
					let nameTab = bloc.charAt(0).toUpperCase() + bloc.slice(1); 
					return (
						<TabPane key={index} eventKey={index + 2} tab={nameTab}>	
							<div dangerouslySetInnerHTML={{__html: mono.get("contenu")}} />
						</TabPane>
					);
				})}
			</TabbedArea>
		);	
	}
}

Monographies = connectToStores(Monographies, [ InfoStore ], (context, props) => {
	return context.getStore(InfoStore).getState();
});

export default Monographies;
