import React from "react";
import {Navbar, Nav, NavItem, Row, Col} from "react-bootstrap"; 
import {Panel, Grid, ListGroup, ListGroupItem} from "react-bootstrap";
import {CollapsibleNav} from "react-bootstrap";

import BaseExplorer from "../../components/BaseExplorer";
import BaseSearch from "../../components/BaseSearch";
import FirstChildsChart from "../../components/FirstChildsChart";
import PhenologieChart from "../../components/PhenologieChart";
import Title from "../../components/Title";

import Monographies from "./components/Monographies";
import CarouselPhoto from "../../components/carousel/CarouselPhoto";

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
	const name = <em>{props.current.get("name")}</em>;
	const title = (
		<h1>
			<span>Atlas des {props.current.get("nomVern")} </span>
			<span>({name})</span>
		</h1>
	);
	const mapTitle        = (<h3>Répartition en maille 10km des {name}</h3>);
	const galeriePhoto    = (<h3>Photo de {name}</h3>);
	const infoTitle       = (<h3>Informations sur {name}</h3>);
	const firstChildTitle = <Title name={name} rang={props.current.get("rang")} type="firstChild" />
	const phenologieTitle = (<h3>Phénologie de {name}</h3>);

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
				<div className="navbar-default sidebar">
					<div className="sidebar-nav navbar-collapse">
						<ul className="side-menu">
							<BaseSearch
								withBackdrop={true}
								divInput={searchStyle.divInput}
								label={props.current.get("nomVern")}
								parentsCdnom={props.current.get("cdnom")}
							/>
						</ul>
					</div>
				</div>
			</nav>
			<BaseExplorer className="explorer" buttonMaterial={true} />
			<div className="content">
				<Grid fluid>
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

