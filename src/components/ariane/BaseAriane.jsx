import React from "react";
import shouldPureComponentUpdate from "react-pure-render/function";
import {Ariane} from "client-interface-components";

import ComposeArianeItem from "./ComposeArianeItem";

/**
 * Component for display ariane
 * @author Jean BOUDET
 */
class BaseAriane extends React.Component
{
	constructor(props) {
		super(props);	
	}

	shouldComponentUpdate = shouldPureComponentUpdate

	render() {
		let props = this.props;
		return (
			<Ariane 
				parents={this.props.parents}
				withCompose={ComposeArianeItem}
				{...props}
			/>	
		)	
	}
}

export default BaseAriane;
