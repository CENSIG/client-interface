var React            = require("react"),
		ApplicationStore = require("../stores/ApplicationStore");

var Html = React.createClass({
	render: function() {
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
});

module.exports = Html;
