import React from "react";
import {Navbar, Nav, NavItem, Row, Col} from "react-bootstrap"; 
import {Panel, Grid, ListGroup, ListGroupItem} from "react-bootstrap";

import BaseExplorer from "../../components/BaseExplorer";
import BaseSearch from "../../components/BaseSearch";
import PanelInfo from "./components/PanelInfo";
import FirstChildsChart from "../../components/FirstChildsChart";
import BaseAriane from "../../components/BaseAriane";
import BaseBrothersNav from "../../components/BaseBrothersNav";
import CarouselPhoto from "../../components/carousel/CarouselPhoto";

import {base} from "../../configs/themesForMap";
import searchStyle from "./components/styles/searchStyle";

var map;

if (process.env.BROWSER && window !== "undefined") {
	require("./css/explorer.css");
	require("./css/content.css");
	require("../../../node_modules/leaflet/dist/leaflet.css");

	var BaseMap = require("../../components/map").BaseMap;
}

export default function(props) {
	const title           = props.info.get("nom");
	const mapTitle        = (<h3>Répartition en maille 10km des <strong>{title}</strong></h3>);
	const galeriePhoto    = (<h3>Photos de <strong>{title}</strong></h3>);
	const infoTitle       = (<h3>Informations générales sur <strong>{title}</strong></h3>);
	const firstChildTitle = (<h3>Répartitions des principaux enfants de <strong>{title}</strong></h3>);
	const brothersTitle   = (<h3>Taxon frères de <strong>{title}</strong></h3>);

	const brand = (
			<div className="navbar-brand">
				<BaseAriane />
			</div>
	);

	if (process.env.BROWSER && window !== "undefined") {
		map = <BaseMap
			height={500}
			width="100%"
			theme={base}
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
								label={props.atlas.name}
								parentsCdnom={props.atlas.id}
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
						</Col>
						<Col lg={7}>
							<Panel header={galeriePhoto}>
								<CarouselPhoto />
							</Panel>
							<Panel header={infoTitle}>
								<PanelInfo />
							</Panel>
						</Col>
					</Row>
				</Grid>
			</div>
		</div>
	);
}
