import React from "react";
import {Navbar, Nav, NavItem, Row, Col} from "react-bootstrap"; 
import {Panel, Grid, ListGroup, ListGroupItem} from "react-bootstrap";

import BaseExplorer from "../../components/BaseExplorer";
import BaseSearch from "../../components/BaseSearch";
import Monographies from "./components/Monographies";
import FirstChildsChart from "../../components/FirstChildsChart";
import PhenologieChart from "../../components/PhenologieChart";
import BaseAriane from "../../components/BaseAriane";
import BaseBrothersNav from "../../components/BaseBrothersNav";
import CarouselPhoto from "../../components/carousel/CarouselPhoto";
import Title from "../../components/Title";

import {themesForMap} from "../../configs/appConfig";
import searchStyle from "./components/styles/searchStyle";

var map;

if (process.env.BROWSER && window !== "undefined") {
	require("./css/explorer.css");
	require("./css/content.css");
	require("../../../node_modules/leaflet/dist/leaflet.css");

	var BaseMap = require("../../components/map").BaseMap;
}

export default function(props) {
	const name = <em>{props.info.get("nom")}</em>;
	const title = (
		<h1>
			<span>{name}</span>
			<span> ({props.info.get("nomVern")})</span>
		</h1>
	);
	const mapTitle        = (<h3>Répartition en maille 10km des {name}</h3>);
	const galeriePhoto    = (<h3>Photos de {name}</h3>);
	const infoTitle       = (<h3>Informations sur {name}</h3>);
	const firstChildTitle =	<Title name={name} rang={props.info.get("rang")} type="firstChild" />
	const phenologieTitle = (<h3>Phénologie de {name}</h3>);
	const brothersTitle   = <Title name={name} rang={props.info.get("rang")} type="brothersNav" />

	const brand = (
			<div className="navbar-brand">
				<BaseAriane />
			</div>
	);

	if (process.env.BROWSER && window !== "undefined") {
		map = <BaseMap
			height={500}
			width="100%"
			theme={themesForMap.base}
		/>
	}

	return (
		<div>
			<nav className="navbar navbar-default navbar-fixed-top" role="navigation">
				<div className="navbar-header">
					<a className="navbar-brand" href="#">{title}</a>
				</div>
				<div className="nav-align navbar-right">
					<BaseAriane />	
				</div>
				<div className="navbar-default sidebar">
					<div className="sidebar-nav navbar-collapse">
						<ul className="side-menu">
							<BaseSearch
								withBackdrop={true}
								divInput={searchStyle.divInput}
								label={props.atlas.current.get("name")}
								parentsCdnom={props.atlas.current.get("cdnom")}
							/>
						</ul>
					</div>
				</div>
			</nav>
			<BaseExplorer className="explorer" buttonMaterial={true} />
			<div className="content">
				<Grid fluid>
					<Row>
						<Col md={12}>
							<Panel header={brothersTitle}>
								<BaseBrothersNav />
							</Panel>
						</Col>
					</Row>
					<Row>
						<Col lg={5}>
							<Panel header={mapTitle}>
								{map}
							</Panel>
							<Panel header={firstChildTitle}>
								<FirstChildsChart />	
							</Panel>
							<Panel header={phenologieTitle}>
								<PhenologieChart />
							</Panel>
						</Col>
						<Col lg={7}>
							<Panel header={galeriePhoto}>
								<CarouselPhoto />
							</Panel>
							<Panel header={infoTitle}>
								<Monographies />
							</Panel>
						</Col>
					</Row>
				</Grid>
			</div>
		</div>
	);
}
