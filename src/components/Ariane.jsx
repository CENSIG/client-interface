import React from "react";

if (process.env.BROWSER) {
	require('../assets/css/base/ariane.css');
}

/**
 * Last item for breadcrumb
 * @author Jean BOUDET
 */
class ArianeItemLast extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		return (
			<span className="ariane-item-last">
				<strong>{this.props.children}</strong>
			</span>
		);		
	}
}
	
/**
 * Item for breadcrumb
 * @author Jean BOUDET
 */
class ArianeItem extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		return (
			<span className="ariane-item">
				{this.props.children}
			</span>
		);	
	}
}

/**
 * Breadcrumb
 * @author Jean BOUDET
 */
class Ariane extends React.Component
{
	constructor(props) {
		super(props);
	}

	render() {
		var n     = this.props.parents.length;
		var items = this.props.parents.map((parent, i) => {
			var res;
			if (n === i + 1) {
				res = <ArianeItemLast>{parent.name}</ArianeItemLast>;
			} else {
				res = <ArianeItem>{parent.name}</ArianeItem>;
			}
			return res; 
		});
		return (
			<div className="ariane">
				{items}	
			</div>
		);	
	}
}

export default Ariane;
