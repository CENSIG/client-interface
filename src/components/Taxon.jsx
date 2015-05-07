var React      = require("react"),
		TaxonStore = require("../stores/TaxonStore");

var Taxon = React.createClass({
	contextTypes: {
		getStore: React.PropTypes.func
	},

	componentDidMount: function() {
		this.context.getStore(TaxonStore).addChangeListener(this.onChange);
	},

	getInitialState: function() {
		return this.getState();	
	},

	getState: function() {
		return this.context.getStore(TaxonStore).getState();
	},

	onChange: function() {
		this.setState(this.getState());
	},

	render() {
		return (
			<div>
				<p>Bienvenue dans l'atlas des {this.state.info.name}</p>
			</div>	
		);
	}
});

module.exports = Taxon;
