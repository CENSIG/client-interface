import React					 from "react";
import NavIndex				 from "./NavIndex";
import elementNavIndex from "../configs/elementNavIndex";

if (process.env.BROWSER) {
	require("../assets/css/base/index.css");
}

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
		return (
			<div className="index">
				<div className="wrapper flex fdc fas">
					<div className="title card">
						<h1 className="logo">
							<span>Conservatoire d'espaces naturels</span>
						</h1>
					</div>
					<NavIndex elements={elementNavIndex} />
				</div>
			</div>
		);
	}
}

export default Index;
