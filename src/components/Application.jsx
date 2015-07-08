import React						from "react";
import ApplicationStore from "../stores/ApplicationStore";
import {provideContext, connectToStores} from "fluxible/addons";
import {handleHistory}  from "fluxible-router";
import {api} from "../configs/appConfig";
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
			atlasUriName: this.props.currentRoute.get("params").get("name"),
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
		var spin;
		var Handler = this.props.currentRoute.get("handler");

		return (
			<div>
				<Handler />	
			</div>
		);
	}
}

Application.childContextTypes = {
	atlasUriName: React.PropTypes.string,
	api: React.PropTypes.object
};

Application = connectToStores(Application, [ ApplicationStore ], (stores, props) => {
		return stores.ApplicationStore.getState();
});

Application = handleHistory(Application);
Application = provideContext(Application);

export default Application;
