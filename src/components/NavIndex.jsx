import React		 from "react";
import {NavLink} from "fluxible-router";

/**
 * This is item for theme navigation (if exist)
 * For example, Papillons is a theme for item Atlas
 * @author Jean BOUDET
 */
class NavIndexItemTheme extends React.Component
{
	constructor(props) {
		super(props);
	}

	render() {
		var items = this.props.themes.map(item => {
			return (
				<li>
					<NavLink routeName={item.routeName} navParams={item.navParams}>
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

/**
 * This is main item for navigation (example Atlas)
 * @author Jean BOUDET
 */
class NavIndexItem extends React.Component
{
	constructor(props) {
		super(props);
	}

	render() {
		var className = this.props.className + " card";
		return (
			<li className={className}>
				<div className="content-item">
					<h3>{this.props.title}</h3>
					<p>{this.props.children}</p>
					{this.props.themes}
				</div>
			</li>
		);
	}
}

/**
 * This is index page navigation
 * @author Jean BOUDET
 */
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
				<NavIndexItem className={element.className} title={element.title} themes={linkTheme}>
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
