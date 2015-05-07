var React            = require("react"),
		ApplicationStore = require("../stores/ApplicationStore"),
		provideContext   = require("fluxible/addons/provideContext"),
		handleHistory = require("fluxible-router").handleHistory,
		Index            = require("./Index"),
		Taxon            = require("./Taxon");

if (process.env.BROWSER) {
	require('../assets/css/reset.css');
	require('../assets/css/base/utils.css');
}

var Application = React.createClass({
	contextTypes: {
		getStore: React.PropTypes.func	
	},

	componentDidMount: function() {
		this.context.getStore(ApplicationStore).addChangeListener(this.onChange);
	},

	componentDidUpdate: function(prevProps, prevState) {
		var newState = this.state;
		if (newState.currentTitlePage === prevState.currentTitlePage) {
			return;	
		}
		document.title = newState.currentTitlePage;
	},

	getInitialState: function() {
		return this.getState();
	},

	getState: function() {
		return this.context.getStore(ApplicationStore).getState();
	},

	onChange: function() {
		this.setState(this.getState());
	},

	render() {
		var Handler = this.props.currentRoute.get("handler");
		return (
			<div>
				<Handler />	
			</div>
		);
	}
});

Application = handleHistory(Application);

Application = provideContext(Application);

module.exports = Application;
