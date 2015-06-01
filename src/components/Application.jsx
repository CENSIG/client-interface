import React						from "react";
import ApplicationStore from "../stores/ApplicationStore";
import {provideContext, connectToStores} from "fluxible/addons";
import {handleHistory}  from "fluxible-router";


if (process.env.BROWSER) {
	require('../assets/css/reset.css');
	require('../assets/css/base/fonts/fonts.css');
	require('../assets/css/base/utils.css');
	require('../assets/css/base/main.css');
	var Spin = require("./Spin");
}

/**
 * Top component. This component handles
 * display application
 * @author Jean BOUDET
 */
class Application extends React.Component
{
	constructor(props, context) {
		super(props);
	}

	getChildContext() {
		return {
			atlasUriName: this.props.currentRoute.get("params").get("name")
		};
	}

	componentDidUpdate(prevProps) {
		var newProps = this.props;
		if (newProps.currentTitlePage === prevProps.currentTitlePage) {
			return;	
		}
		document.title = newProps.currentTitlePage;
	}

	render() {
		var spin;
		var Handler = this.props.currentRoute.get("handler");

		if (!this.props.loaded && typeof window !== "undefined") {
			spin = <Spin name="three-bounce" />;
		}

		return (
			<div>
				{spin}
				<Handler />	
			</div>
		);
	}
}

Application.childContextTypes = {
	atlasUriName: React.PropTypes.string
}

Application = connectToStores(Application, [ ApplicationStore ], (stores, props) => {
		return stores.ApplicationStore.getState();
});

Application = handleHistory(Application);
Application = provideContext(Application);

export default Application;
