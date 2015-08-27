import React from "react";
import modalStyle from "./styles/modalStyle";

const style = {
	ul: {
		display: "inline-block",
		verticalAlign: "top"
	}
}

class UsersSearch extends React.Component
{
	constructor(props) {
		super(props);	
		this.state = {
			displaying: false,
			over: false
		};
	}

	componentDidMount() {
		let modal = React.findDOMNode(this.refs.modal);
		let modalContent = React.findDOMNode(this.refs.modalContent);
		modalContent.addEventListener("mouseover", this._handleMouseOver.bind(this));
		modalContent.addEventListener("mouseleave", this._handleMouseOver.bind(this));

		modal.addEventListener("click", this._hanldeModalClick.bind(this));
	}

	_handleMouseOver(e) {
		this.setState({
			over: !this.state.over
	  });	
	}

	_hanldeModalClick(e) {
		if (!this.state.over) {
			this.setState({
				displaying: false	
			});	
		}	
	}

	_handleClick(e) {
		this.setState({
			displaying: true	
		});	
	}

	_getStyleModal() {
		return this.state.displaying ? modalStyle.show : modalStyle.hidden;
	}

	render() {
		let props = this.props;
		return (
			<div>
				<span onClick={this._handleClick.bind(this)}>{props.labelButton}</span>
				<div ref="modal" style={this._getStyleModal()}>
					<div ref="modalContent" style={modalStyle.content}>
						<ul style={style.ul}>
							<li>A</li>
							<li>B</li>
							<li>C</li>
							<li>D</li>
						</ul>
						<ul style={style.ul}>
							<li>Abady Florian</li>
							<li>Bouche Huguette</li>
							<li>Sino Oscar</li>
						</ul>
					</div>
				</div>
			</div>
		);	
	}
}

export default UsersSearch;
