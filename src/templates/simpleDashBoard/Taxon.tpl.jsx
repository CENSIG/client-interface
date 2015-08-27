import React from "react";
import {Navbar, Nav, NavItem, Row, Col} from "react-bootstrap"; 
import {Panel, Grid, ListGroup, ListGroupItem} from "react-bootstrap";

import BaseExplorer from "../../components/explorer/BaseExplorer";
import BaseSearch from "../../components/search/BaseSearch";
import Monographies from "./components/Monographies";
import NavBarWrapper from "./components/NavBarWrapper";
import MainTitle from "./components/MainTitle";
import Content from "./components/Content";
import FirstChildsChart from "../../components/FirstChildsChart";
import PhenologieChart from "../../components/PhenologieChart";
import BaseAriane from "../../components/ariane/BaseAriane";
import BaseBrothersNav from "../../components/brothersNav/BaseBrothersNav";
import CarouselPhoto from "../../components/carousel/CarouselPhoto";
import Title from "../../components/Title";

import {themesForMap} from "../../configs/appConfig";
import searchStyle from "./components/styles/searchStyle";
import arianeStyle from "./components/styles/arianeStyle";
import explorerStyle from "./components/styles/explorerStyle";

var map;

if (process.env.BROWSER && window !== "undefined") {
	require("./css/explorer.css");
	require("./css/content.css");
	require("../../../node_modules/leaflet/dist/leaflet.css");

	var BaseMap = require("../../components/map").BaseMap;
}

export default function(props) {
	
	const atlas = props.atlas;
	const taxon = props.taxon;
	
	const name = <em>{taxon.info.get("nom")}</em>;
	const title = <MainTitle firstTitle={name} smallTitle={taxon.info.get("nomVern")} />;
	const mapTitle        = (<h3>Répartition en maille 10km des {name}</h3>);
	const galeriePhoto    = (<h3>Photos de {name}</h3>);
	const infoTitle       = (<h3>Informations sur {name}</h3>);
	const firstChildTitle =	<Title name={name} rang={taxon.info.get("rang")} type="firstChild" />
	const phenologieTitle = (<h3>Phénologie de {name}</h3>);
	const brothersTitle   = <Title name={name} rang={taxon.info.get("rang")} type="brothersNav" />

	if (process.env.BROWSER && window !== "undefined") {
		map = <BaseMap
			grille10={taxon.grille10}
			height={500}
			width="100%"
			theme={themesForMap.base}
		/>
	}

	return (
		<div>
			<NavBarWrapper title={title} right={<BaseAriane parents={taxon.parents} styleDivBase={arianeStyle.base}/>}>
				<li>
					<BaseSearch
						withBackdrop={true}
						divInput={searchStyle.divInput}
						divInputActive={searchStyle.divInputActive}
						divContainer={searchStyle.divContainer}
						ulResults={searchStyle.ulResults}
						cdnom={atlas.current.get("cdnom")}
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
								<FirstChildsChart data={taxon.firstChilds} />	
							</Panel>
							<Panel header={phenologieTitle}>
								<PhenologieChart data={taxon.phenologie} />
							</Panel>
						</Col>
						<Col lg={7}>
							<Panel header={galeriePhoto}>
								<CarouselPhoto photos={taxon.photos} />
							</Panel>
							<Panel header={infoTitle}>
								<Monographies 
									alphabetObservateurs={taxon.alphabetObservateurs}
									general={taxon.info}	
									monographies={taxon.monographies}
								/>
							</Panel>
						</Col>
					</Row>
				</Grid>
			</Content>
		</div>
	);
}
