import React		 from "react";
import {NavLink} from "fluxible-router";

class NavIndexItemTheme extends React.Component
{
	constructor(props) {
		super(props);
	}

	render() {
		var items = this.props.themes.map(item => {
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
}

class NavIndexItem extends React.Component
{
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<li className="card">
				<h3>{this.props.title}</h3>
				<p>{this.props.children}</p>
				{this.props.themes}
			</li>
		);
	}
}

class NavIndex extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		var linkHTML = this.props.elements.map(element => {
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
}

export default NavIndex;
