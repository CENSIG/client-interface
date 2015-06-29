import path from "path";
import {template} from "../configs/appConfig";
import React from "react";
import templates from "./index";

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
		return templates[template][component](props);
	}
}

export default Template;


