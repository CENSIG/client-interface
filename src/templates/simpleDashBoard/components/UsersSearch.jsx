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

	_getContent() {
		let props = this.props;
		return (
			<div>
				<ul style={style.ul}>
					{props.alphabet.map((letter, idx) => {
						return (
							<li key={idx}>{letter.get("firstNameLetter")}</li>
						);	
					})}
				</ul>
				<ul style={style.ul}>
					<li>Abady Florian</li>
					<li>Bouche Huguette</li>
					<li>Sino Oscar</li>
				</ul>
			</div>
		);	
	}

	render() {
		let content;
		let props = this.props;
		if (props.alphabet.size === 0) {
			content = <p>Il n'y a pas d'utilisateur</p>;
		} else {
			content = this._getContent();
		}
		return (
			<div>
				<span onClick={this._handleClick.bind(this)}>{props.labelButton}</span>
				<div ref="modal" style={this._getStyleModal()}>
					<div ref="modalContent" style={modalStyle.content}>
						{content}
					</div>
				</div>
			</div>
		);	
	}
}

export default UsersSearch;
