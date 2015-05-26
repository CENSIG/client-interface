import TaxonAction from "../actions/TaxonAction";
import AtlasAction from "../actions/AtlasAction";
import TaxonStore	 from "../stores/TaxonStore";
import AtlasStore	 from "../stores/AtlasStore";
import Index		   from "../components/Index";
import Atlas		   from "../components/Atlas";
import Taxon			 from "../components/Taxon";
import appConfig	 from "../configs/appConfig";

/**
 * Routes
 * @author Jean BOUDET
 */
export default {
	index: {
		path: "/",
		method: "get",
		label: "Index",
		page: "index",
		handler: Index,
		action: (context, payload, done) => {
			context.dispatch("UPDATE_TITLE", { label: "Bienvenue sur l'application WebOb's"});
			done();
		}
	},

	"atlas": {
		path    : "/atlas/:name",
		method  : "get",
		handler : Atlas,
		action  : (context, payload) => {
			var atlasName = payload.get("params").get("name");
			var cdnom = appConfig.atlas[atlasName].cdnom
			if (context.getStore(AtlasStore).getInfo().id !== cdnom) {
				return AtlasAction.getData(context, { cdnom: cdnom})
					.then(function() {
						context.dispatch("UPDATE_TITLE", { label: "WebOb's | Atlas des " + atlasName });
					})
			}
		}
	},

	"taxon": {
		path: "/atlas/:name/:cdnom",
		method: "get",
		handler: Taxon,
		label: "taxon",
		page: "taxon",
		action : (context, payload) => {
			context.dispatch("RESET_SEARCH", { results: [], pendingRequest: null });
			var atlasName = payload.get("params").get("name");
			var cdnom = payload.get("params").get("cdnom");
			var limit = appConfig.atlas[atlasName].limit;
			if (cdnom !== context.getStore(TaxonStore).getInfo().id) {
				return TaxonAction.getData(context, { cdnom: cdnom, limit: limit }).then(function() {
					var name = context.getStore(TaxonStore).getInfo().nom;
					context.dispatch("UPDATE_TITLE", { label: "WebOb's | " + name });
				});
			}
		}
	}
};
