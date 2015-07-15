import React from "react";
import {Navbar, Nav, NavItem, Row, Col} from "react-bootstrap"; 
import {Panel, Grid, ListGroup, ListGroupItem} from "react-bootstrap";

import BaseExplorer from "../../components/BaseExplorer";
import BaseSearch from "../../components/BaseSearch";
import PanelInfo from "./components/PanelInfo";
import FirstChildsChart from "../../components/FirstChildsChart";
import BaseAriane from "../../components/BaseAriane";
import BaseBrothersNav from "../../components/BaseBrothersNav";

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
	const galeriePhoto    = (<h3>Galerie photo</h3>);
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
			<Grid fluid>
				<Row>
					<Col md={12}>
						<Navbar brand={brand} fixedTop fluid></Navbar>
						<BaseExplorer className="explorer" buttonMaterial={true} />
					</Col>
				</Row>
				<div className="content">
					<Row>
						<Col md={1}>
							<nav style={{position: "fixed"}}>
								<BaseSearch
									withBackdrop={true}
									divInput={searchStyle.divInput}
									label={props.atlas.name}
									parentsCdnom={props.atlas.id}
								/>
							</nav>
						</Col>
						<Col md={11}>
							<Row>
								<Col md={12}>
									<Panel header={brothersTitle}>
										<BaseBrothersNav />
									</Panel>
								</Col>
							</Row>
							<Row>
								<Col md={5}>
									<Panel header={mapTitle}>
										{map}
									</Panel>
								</Col>
								<Col md={7}>
									<Row>
										<Col lg={12}>
											<Panel header={galeriePhoto}>
												PHOTO	
											</Panel>
										</Col>
										<Col lg={12}>
											<Panel header={infoTitle}>
												<PanelInfo />
											</Panel>
										</Col>
									</Row>
								</Col>
							</Row>
							<Row>
								<Col md={5}>
									<Panel header={firstChildTitle}>
										<FirstChildsChart />	
									</Panel>
								</Col> 
							</Row>
						</Col>
					</Row>
					</div>
				</Grid>
		</div>
	);
}
