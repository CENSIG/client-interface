import React						from "react";
import shouldPureComponentUpdate from "react-pure-render/function";
import ApplicationStore from "../stores/ApplicationStore";
import {provideContext, connectToStores} from "fluxible/addons";
import {handleHistory}  from "fluxible-router";
import {api} from "../configs/appConfig";

if (process.env.BROWSER) {
	var Loading = require("./pages/Loading");
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

	shouldComponentUpdate = shouldPureComponentUpdate

	getChildContext() {
		let props = this.props;
		api.setHeaders({
			"X-Access-Token": props.auth.get("token"),
			"X-Client-Id": props.auth.get("id")
		});
		return {
			atlasUriName: props.currentRoute.get("params").get("name"),
			api: api
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
		let content;
		let Handler = this.props.currentRoute.get("handler");

		if (this.props.unauthorized) {
			console.log("oh");
			content = <p>Réactualiser</p>;
		} else if (this.props.isNavigateComplete) {
			content = <Handler />;
		} else {
			content = <Loading />;
		}

		return content;
	}
}

Application.childContextTypes = {
	atlasUriName: React.PropTypes.string,
	api: React.PropTypes.object
};

Application = connectToStores(Application, [ ApplicationStore ], (context, props) => {
		return context.getStore(ApplicationStore).getState();
});

Application = handleHistory(Application);
Application = provideContext(Application);

export default Application;
