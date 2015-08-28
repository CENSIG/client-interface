import React from "react";
import shouldPureComponentUpdate from "react-pure-render/function";

import modalStyle from "./styles/modalStyle";

class Modal extends React.Component
{
	constructor(props) {
		super(props);	
		this.state = {
			over: false
		}
	}

	_getStyleModal() {
		return this.props.displaying ? modalStyle.show : modalStyle.hidden;
	}

	shouldComponentUpdate = shouldPureComponentUpdate

	componentDidMount() {
		let modal = React.findDOMNode(this.refs.modal);
		let modalContent = React.findDOMNode(this.refs.modalContent);
		modalContent.addEventListener("mouseover", this._handleMouseOver.bind(this));
		modalContent.addEventListener("mouseleave", this._handleMouseLeave.bind(this));

		modal.addEventListener("click", this._hanldeModalClick.bind(this));
	}

	_handleMouseOver(e) {
		this.setState({
			over: true 
	  });	
	}

	_handleMouseLeave(e) {
		this.setState({
			over: false	
		});		
	}

	_hanldeModalClick(e) {
		if (!this.state.over) {
			this.props.handleHide();
		}	
	}

	render() {
		let props = this.props;
		return (
			<div ref="modal" style={this._getStyleModal()}>
				<div ref="modalContent" style={modalStyle.content}>
					<div style={modalStyle.title}>
						{props.title}	
					</div>
					{props.children}
				</div>
			</div>
		);	
	}
}

export default Modal;
