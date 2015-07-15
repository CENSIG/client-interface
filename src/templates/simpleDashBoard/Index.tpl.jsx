import React from "react";
import NavIndex				 from "../../components/NavIndex";
import elementNavIndex from "../../configs/elementNavIndex";

if (process.env.BROWSER) {
	require("./css/index.css");
}

export default function(props) {
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
