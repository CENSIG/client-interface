var React = require("react"),
		NavLink = require("fluxible-router").NavLink;

var NavIndexItemTheme = React.createClass({
	render() {
		var items = this.props.themes.map(function(item) {
			return (
				<li>
					<NavLink routeName={item.routeName}>
						{item.title}
					</NavLink>
				</li>
			);
		});

		return (
			<ul>
				{items}
			</ul>
		);	
	}
});


var NavIndexItem = React.createClass({
	render: function() {
		return (
			<li className="card">
				<h3>{this.props.title}</h3>
				<p>{this.props.children}</p>
				{this.props.themes}
			</li>
		);
	}
});

var NavIndex = React.createClass({
	render: function() {
		var linkHTML = this.props.elements.map(function(element) {
			var themes = element.themes;
			var linkTheme;

			if (themes) linkTheme = <NavIndexItemTheme themes={themes} />;

			return (
				<NavIndexItem title={element.title} themes={linkTheme}>
					{element.description}
				</NavIndexItem>
			);
		});

		return (
			<nav>
				<ul>
					{linkHTML}
				</ul>
			</nav>
		);
	}
});

module.exports = NavIndex;
