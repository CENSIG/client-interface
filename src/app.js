/**
 * Fluxible wrapper
 * @author Jean BOUDET
 */
import Fluxible					from "fluxible";
import BaseRouteStore		from "./stores/BaseRouteStore";
import Application			from "./components/Application";
import ApplicationStore from "./stores/ApplicationStore";
import TaxonStore				from "./stores/TaxonStore";
import SearchStore	from "./stores/SearchStore";
import AtlasStore				from "./stores/AtlasStore";
import BrothersNavigationStore from "./stores/BrothersNavigationStore";
import ExploreStore from "./stores/ExploreStore";
import ParentsStore from "./stores/ParentsStore";
import FirstChildsStore from "./stores/FirstChildsStore";
import InfoStore from "./stores/InfoStore";
import GeoStore from "./stores/GeoStore";
import PhotoStore from "./stores/PhotoStore";
import PhenologieStore from "./stores/PhenologieStore";

const stores = [
	ApplicationStore, ParentsStore, BaseRouteStore,
	TaxonStore, SearchStore, AtlasStore,
	BrothersNavigationStore, ExploreStore, FirstChildsStore,
	InfoStore, GeoStore, PhotoStore, PhenologieStore
];

var app = new Fluxible({
	component: Application // Top component context
});

stores.forEach(store => app.registerStore(store));
export default app;
