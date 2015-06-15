/**
 * Fluxible wrapper
 * @author Jean BOUDET
 */
import Fluxible					from "fluxible";
import BaseRouteStore		from "./stores/BaseRouteStore";
import Application			from "./components/Application";
import ApplicationStore from "./stores/ApplicationStore";
import TaxonStore				from "./stores/TaxonStore";
import SearchTaxonStore	from "./stores/SearchTaxonStore";
import AtlasStore				from "./stores/AtlasStore";
import BrothersNavigationStore from "./stores/BrothersNavigationStore";
import ExploreSubTaxonStore from "./stores/ExploreSubTaxonStore";

var app = new Fluxible({
	component: Application // Top component context
});

app.registerStore(ApplicationStore);
app.registerStore(BaseRouteStore);
app.registerStore(TaxonStore);
app.registerStore(SearchTaxonStore);
app.registerStore(AtlasStore);
app.registerStore(BrothersNavigationStore);
app.registerStore(ExploreSubTaxonStore);

export default app;
