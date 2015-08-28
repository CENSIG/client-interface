import React from "react";
import shouldPureComponentUpdate from "react-pure-render/function";
import Radium from "radium";
import {connectToStores} from "fluxible/addons";

import style from "./styles/modalContentStyle";
import ObservateursStore from "../../../stores/ObservateursStore";
import SearchAction from "../../../actions/SearchAction";
import LoadingForComponent from "../../../components/pages/LoadingForComponent";
import Modal from "./Modal";

class UsersSearch extends React.Component
{
	constructor(props) {
		super(props);	
		this.state = {
			displaying: false
		};
	}
	
	shouldComponentUpdate = shouldPureComponentUpdate
	
	_handleClick(e) {
		this.setState({
			displaying: true	
		});	
	}

	_handleModalHide() {
		this.setState({
			displaying: false	
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

	_getContent() {
		let props = this.props;
		let rightContent;
		if (props.pendingRequest) {
			rightContent = <LoadingForComponent style={style.loading}/>;
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
							<li key={idx} onClick={this._handleClickAlphabet.bind(this)}>
								{letter.get("firstNameLetter")}
							</li>
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
		let title = <h1>Rechercher un observateurs pour <em>{props.taxonName}</em></h1>
		if (props.alphabet.size === 0) {
			content = <p>Il n'y a pas d'utilisateur</p>;
		} else {
			content = this._getContent();
		}
		return (
			<div style={{display: "inline"}}>
				<span onClick={this._handleClick.bind(this)}>{props.labelButton}</span>
				<Modal 
					title={title}
					displaying={this.state.displaying}
					handleHide={this._handleModalHide.bind(this)}
				>
						{content}
				</Modal>
			</div>
		);	
	}
}

UsersSearch.contextTypes = {
	api: React.PropTypes.object,
	executeAction: React.PropTypes.func
};

UsersSearch = Radium(UsersSearch);

UsersSearch = connectToStores(UsersSearch, [ ObservateursStore ], ( context, props ) => {
	return context.getStore(ObservateursStore).getState();
});

export default UsersSearch;
