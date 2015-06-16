import React						from "react";
import ApplicationStore from "../stores/ApplicationStore";

const scriptsProdName = [
	"/static/vendors.bundle.js",
	"/static/app.bundle.js"
];

/**
 * A component for HTML structure
 * @author Jean BOUDET
 */
class Html extends React.Component
{
	constructor(props) {
		super(props);
	}

	/**
	 * Get css bundle or not if dev mode
	 * is enable
	 */
	_getLink() {
		var link;
		if (this.props.mode !== "development") {
			link = (
				<link rel="stylesheet" media="screen" href="/static/bundle.css" /> 	
			);	
		}
		return link;
	}

	/**
	 * Get js script bundle
	 */
	_getScript() {
		var script;
		if (this.props.mode === "development") {
			script = (
				<script src="/static/bundle.js"></script>
			);
		}	else {
			script = scriptsProdName.map(name => {
				return <script src={name}></script>;
			});
		}
		return script;
	}

	render() {
		return (
			<html lang="fr">
				<head>
					<meta charset="UTF-8" />
					{this._getLink()}
					<title>{this.props.context.getStore(ApplicationStore).getCurrentTitlePage()}</title>
				</head>
				<body>
					<div className="main" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
					<script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
					{this._getScript()}
				</body>
			</html> 	
		);
	}
}

export default Html;
