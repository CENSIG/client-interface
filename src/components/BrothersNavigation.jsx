import React from "react";

class BrothersNavigation extends React.Component
{
	constructor(props) {
		super(props);	
		this.state = {
			left: null,
			right: null,
			current: null
		};
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.brothers !== this.props.brothers;	
	}	

	componentWillUpdate(nextProps) {
		console.log("will update");
	}

	componentDidUpdate(nextProps) {
		console.log("did update");	
	}

	getLeftRight(brothers, currentCdnom) {

		var currentIndex = this.state.current;

		if (currentIndex === null) {
			currentIndex = brothers.findIndex((value, i) => {
				return value.cdnom = currentCdnom	
			});
		}

		var left;
		var right;
		var last   = brothers.size - 1;
		var before = currentIndex - 1;
		var after  = currentIndex + 1;

		if (currentIndex === 0) {
			left  = last
			right = after;
		} else if (currentIndex === last) {
			left  = before;
			right = 0;
		} else {
			left  = before;
			right = after;
		}

		this.setState({
			left    : left,
			right   : right,
			current : currentIndex
		});
	}

	componentWillMount() {
		//this.getLeftRight(this.props.brothers, this.props.currentCdnom);
		console.log(this.props.brothers);
	}

	render() {
		if (this.props.brothers.size === 0) {
			return null;	
		}

		return (
			<nav>
				<ul>
					<li>{this.props.brothers.get(this.state.left).get("name")}</li>
					<li>{this.props.brothers.get(this.state.right).get("name")}</li>
				</ul>
			</nav>
		);	
	}
}

export default BrothersNavigation;
