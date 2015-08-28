import React from "react";
import Radium from "radium";
import shouldPureComponentUpdate from "react-pure-render/function";
import {connectToStores} from "fluxible/addons";

import CommunesStore from "../../../stores/CommunesStore";
import Modal from "./Modal";
import LoadingForComponent from "../../../components/pages/LoadingForComponent";
import SearchAction from "../../../actions/SearchAction";
import style from "./styles/modalContentStyle";

class CommunesSearch extends React.Component
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
		context.executeAction(SearchAction.getSearchCommunes, {
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
		let title = <h1>Rechercher une communes pour <em>{props.taxonName}</em></h1>
		if (props.alphabet.size === 0) {
			content = <p>Il n'y a pas de communes visitées</p>;
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

CommunesSearch.contextTypes = {
	api: React.PropTypes.object,
	executeAction: React.PropTypes.func
};

CommunesSearch = Radium(CommunesSearch);

CommunesSearch = connectToStores(CommunesSearch, [ CommunesStore ], (context, props) => {
	return context.getStore(CommunesStore).getState();
});

export default CommunesSearch;
