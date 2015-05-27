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

	shouldComponentUpdate(nextProps) {
		return nextProps.children !== this.props.children;	
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

	shouldComponentUpdate(nextProps) {
		return nextProps.children !== this.props.children;	
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

	shouldComponentUpdate(nextProps) {
		return nextProps.parents !== this.props.parents;	
	}

	render() {
		var n     = this.props.parents.size;
		var items = this.props.parents.map((parent, i) => {
			var res;
			if (n === i + 1) {
				res = <ArianeItemLast>{parent.get("name")}</ArianeItemLast>;
			} else {
				res = <ArianeItem>{parent.get("name")}</ArianeItem>;
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
