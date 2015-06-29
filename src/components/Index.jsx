import React					 from "react";
import Template				 from "../templates/Template";

/**
 * A component for display first page
 * of application
 * @author Jean BOUDET
 */
class Index extends React.Component
{
	constructor(props) {
		super(props);
	}

	render() {
		return <Template component="index" {...this.props} />
	}
}

export default Index;
