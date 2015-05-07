import React						from "react";
import ApplicationStore from "../stores/ApplicationStore";

/**
 * A component for HTML structure
 * @author Jean BOUDET
 */
class Html extends React.Component
{
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<html lang="fr">
				<head>
					<meta charset="UTF-8" />
					<title>{this.props.context.getStore(ApplicationStore).getCurrentTitlePage()}</title>
				</head>
				<body>
					<div className="main" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
					<script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
					<script src="/static/bundle.js"></script>
				</body>
			</html> 	
		);
	}
}

export default Html;
