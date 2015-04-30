var React             = require("react"),
		Router            = require("react-router"),
		navigationElement = require('../utils/navigationElement');

if (process.env.BROWSER) {
	require("../../css/base/index.css");
}

var NavigationItem = React.createClass({
	render() {
		return (
			<li className="card">
				<h3>{this.props.title}</h3>
				<p>{this.props.children}</p>
			</li>
		);
	}
});

var Navigation = React.createClass({
	render() {
		var items = navigationElement.map(function(item) {
			return (
				<NavigationItem title={item.title}>
					{item.description}
				</NavigationItem>
			);
		});
		return (
			<nav>
				<ul>
					{items}	
				</ul>
			</nav>
		);	
	}
});

var Index = React.createClass({
	render() {
		return (
			<div className="index">
				<div className="wrapper">
					<div className="title card">
						<h1 className="logo">
							<span>Conservatoire d'espaces naturels</span>
						</h1>
					</div>
					<Navigation />					
				</div>
			</div>
		);
	}
});

module.exports = Index;
