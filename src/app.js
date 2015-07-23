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

var app = new Fluxible({
	component: Application // Top component context
});

app.registerStore(ApplicationStore);
app.registerStore(ParentsStore);
app.registerStore(BaseRouteStore);
app.registerStore(TaxonStore);
app.registerStore(SearchStore);
app.registerStore(AtlasStore);
app.registerStore(BrothersNavigationStore);
app.registerStore(ExploreStore);
app.registerStore(FirstChildsStore);
app.registerStore(InfoStore);
app.registerStore(GeoStore);
app.registerStore(PhotoStore);

export default app;
