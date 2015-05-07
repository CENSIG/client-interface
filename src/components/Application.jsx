import React						from "react";
import ApplicationStore from "../stores/ApplicationStore";
import {provideContext, connectToStores} from "fluxible/addons";
import {handleHistory}  from "fluxible-router";

if (process.env.BROWSER) {
	require('../assets/css/reset.css');
	require('../assets/css/base/utils.css');
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

	componentDidUpdate(prevProps) {
		var newProps = this.props;
		if (newProps.applicationStore.currentTitlePage === prevProps.applicationStore.currentTitlePage) {
			return;	
		}
		document.title = newProps.applicationStore.currentTitlePage;
	}

	render() {
		var Handler = this.props.currentRoute.get("handler");
		return (
			<div>
				<Handler />	
			</div>
		);
	}
}

Application = connectToStores(Application, [ ApplicationStore ], (stores, props) => {
	return {
		applicationStore: stores.ApplicationStore.getState()
	}
});

Application = handleHistory(Application);
Application = provideContext(Application);

export default Application;
