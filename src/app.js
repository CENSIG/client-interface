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
import ObservateursStore from "./stores/ObservateursStore";
import BrothersNavigationStore from "./stores/BrothersNavigationStore";
import ExploreStore from "./stores/ExploreStore";

const stores = [
	ApplicationStore, BaseRouteStore,
	TaxonStore, SearchStore, AtlasStore,
	BrothersNavigationStore, ExploreStore,
	ObservateursStore
];

var app = new Fluxible({
	component: Application // Top component context
});

stores.forEach(store => app.registerStore(store));
export default app;
