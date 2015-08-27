import React from "react";
import {Row, Col} from "react-bootstrap"; 
import {Panel, Grid, ListGroup, ListGroupItem} from "react-bootstrap";

import BaseExplorer from "../../components/explorer/BaseExplorer";
import BaseSearch from "../../components/search/BaseSearch";
import FirstChildsChart from "../../components/FirstChildsChart";
import PhenologieChart from "../../components/PhenologieChart";
import Title from "../../components/Title";

import PanelInfo from "./components/PanelInfo";
import NavBarWrapper from "./components/NavBarWrapper";
import MainTitle from "./components/MainTitle";
import Content from "./components/Content";
import CarouselPhoto from "../../components/carousel/CarouselPhoto";

import {themesForMap} from "../../configs/appConfig";
import searchStyle from "./components/styles/searchStyle";
import explorerStyle from "./components/styles/explorerStyle";

var map;

if (process.env.BROWSER && window !== "undefined") {
	require("./css/explorer.css");
	require("./css/content.css");
	require("../../../node_modules/leaflet/dist/leaflet.css");

	var BaseMap = require("../../components/map").BaseMap;
}

export default function(props) {
	const firstTitle = "Atlas des " + props.info.get("nomVern");

	const name = <em>{props.info.get("nom")}</em>;
	const title = <MainTitle
		firstTitle={firstTitle}
		smallTitle={name}
	/>;
	const mapTitle        = (<h3>Répartition en maille 10km des {name}</h3>);
	const galeriePhoto    = (<h3>Photo de {name}</h3>);
	const infoTitle       = (<h3>Informations sur {name}</h3>);
	const firstChildTitle = <Title name={name} rang={props.info.get("rang")} type="firstChild" />
	const phenologieTitle = (<h3>Phénologie de {name}</h3>);

	if (process.env.BROWSER && window !== "undefined") {
		map = <BaseMap
			grille10={props.grille10}
			height={500}
			width="100%"
			theme={themesForMap.base}
		/>
	}

	return (
		<div>
			<NavBarWrapper title={title}>
				<li>
					<BaseSearch
						withBackdrop={true}
						divInput={searchStyle.divInput}
						divInputActive={searchStyle.divInputActive}
						divContainer={searchStyle.divContainer}
						ulResults={searchStyle.ulResults}
						cdnom={props.current.get("cdnom")}
					/>
				</li>
			</NavBarWrapper>
			<BaseExplorer 
				baseExplorer={explorerStyle.baseExplorer}
				baseResponsive={explorerStyle.baseResponsive}
				buttonMaterial={true} 
				styleButton={explorerStyle.button}
				styleLoading={explorerStyle.loading}
			/>
			<Content>
				<Grid fluid>
						<Row>
									<Col lg={5}>
										<Panel header={mapTitle}>
											{map}
										</Panel>
										<Panel header={firstChildTitle}>
											<FirstChildsChart data={props.firstChilds} />	
										</Panel>
										<Panel header={phenologieTitle}>
											<PhenologieChart data={props.phenologie} />
										</Panel>
									</Col>
									<Col lg={7}>
												<Panel header={galeriePhoto}>
													<CarouselPhoto photos={props.photos} />
												</Panel>
												<Panel header={infoTitle}>
													<PanelInfo info={props.info} />
												</Panel>
									</Col>
								</Row>
					</Grid>
				</Content>
		</div>
	);
}

