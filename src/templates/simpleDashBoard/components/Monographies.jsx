import React from "react";
import shouldPureComponentUpdate from "react-pure-render/function";
import {TabbedArea, TabPane} from "react-bootstrap";

import PanelInfo from "./PanelInfo";

class Monographies extends React.Component
{
	constructor(props) {
		super(props);	
	}
	
	shouldComponentUpdate = shouldPureComponentUpdate

	_getGeneral(info, alphabetObservateurs) {
		return (
			<PanelInfo 
				alphabetObservateurs={alphabetObservateurs}
				info={info} 
			/>
		);
	}

	render() {
		let props = this.props;
		if (props.monographies.size === 0) {
			return (
				this._getGeneral(props.general, props.alphabetObservateurs)
			);
		}
		return (
			<TabbedArea>
				<TabPane eventKey={1} tab="Général">
					{this._getGeneral(props.general, props.alphabetObservateurs)}
				</TabPane>
				{props.monographies.map((mono, index) => {
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

export default Monographies;
