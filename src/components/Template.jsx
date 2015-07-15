import React from "react";
import path from "path";
import template from "../templates";

/**
 * Class for manage template pages
 * @author Jean BOUDET
 */
class Template extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		const { component, ...props } = this.props;
		return template[component](props);
	}
}

export default Template;


