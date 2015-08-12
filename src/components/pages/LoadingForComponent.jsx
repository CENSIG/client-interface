import React from "react";
import Spinner from "react-spinkit";

/**
 * Spinner for explorer view
 * @author Jean BOUDET
 */
class LoadingForComponent extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		return (
			<div style={this.props.style}>
				<Spinner spinnerName="circle" noFadeIn />
			</div>
		);	
	}
}

export default LoadingForComponent;
