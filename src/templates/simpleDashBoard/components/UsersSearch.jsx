import React from "react";
import shouldPureComponentUpdate from "react-pure-render/function";
import Radium from "radium";
import {connectToStores} from "fluxible/addons";

import ObservateursStore from "../../../stores/ObservateursStore";
import modalStyle from "./styles/modalStyle";
import SearchAction from "../../../actions/SearchAction";
import LoadingForComponent from "../../../components/pages/LoadingForComponent";

const style = {
	ul: {
		display: "inline-block",
		verticalAlign: "top",
		maxHeight: 300,
		overflowY: "scroll"
	},

	left: {
		width: "10%"
	},
	
	right: {
		width: "90%"
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

	_handleClickAlphabet(e) {
		let letter = e.target.textContent;
		let context = this.context, props = this.props;
		context.executeAction(SearchAction.getSearchObservateur, {
			api: context.api,
			cdnom: props.cdnom,
			options: { output: letter }
		});
	}

	_getStyleModal() {
		return this.state.displaying ? modalStyle.show : modalStyle.hidden;
	}

	_getContent() {
		let props = this.props;
		let rightContent;
		if (props.pendingRequest) {
			rightContent = <LoadingForComponent />;
		} else {
			rightContent = (
				<ul style={[style.ul, style.right]}>
					{props.results.map((item, idx) => {
						return (
							<li key={idx}>
								<span>{item.name}</span>
								<span> {item.firstName}</span>
							</li>
						);	
					})}
				</ul>
			);
		}

		return (
			<div>
				<ul style={[style.ul, style.left]}>
					{props.alphabet.map((letter, idx) => {
						return (
							<li key={idx} onClick={this._handleClickAlphabet.bind(this)}>{letter.get("firstNameLetter")}</li>
						);	
					})}
				</ul>
				{rightContent}
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
			<div style={{display: "inline"}}>
				<span onClick={this._handleClick.bind(this)}>{props.labelButton}</span>
				<div ref="modal" style={this._getStyleModal()}>
					<div ref="modalContent" style={modalStyle.content}>
						<h1 style={modalStyle.title}>Rechercher un observateurs pour <em>{props.taxonName}</em></h1>
						{content}
					</div>
				</div>
			</div>
		);	
	}
}

UsersSearch.contextTypes = {
	api: React.PropTypes.func,
	executeAction: React.PropTypes.func
};

UsersSearch = Radium(UsersSearch);

UsersSearch = connectToStores(UsersSearch, [ ObservateursStore ], ( context, props ) => {
	return context.getStore(ObservateursStore).getState();
});

export default UsersSearch;
