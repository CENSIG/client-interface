import TaxonAction from "../actions/TaxonAction";
import AtlasAction from "../actions/AtlasAction";
import InfoStore from "../stores/InfoStore";
import AtlasStore	 from "../stores/AtlasStore";
import Index		   from "../components/pages/Index";
import Atlas		   from "../components/pages/Atlas";
import Taxon			 from "../components/pages/Taxon";
import {atlas}	 from "../configs/appConfig";
import Event from "../utils/Event";

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
			context.dispatch(Event.UPDATE_TITLE, "Bienvenue sur l'application WebOb's");
			done();
		}
	},

	"atlas": {
		path    : "/atlas/:name",
		method  : "get",
		handler : Atlas,
		action  : (context, payload) => {
			var atlasName = payload.get("params").get("name");
			var cdnom     = atlas[atlasName].cdnom;
			context.dispatch(Event.UPDATE_TITLE, "Atlas des " + atlasName);
			return AtlasAction.getData(context, { cdnom: cdnom })
				.then(() => {
					context.dispatch(Event.ATLAS, {
						cdnom   : cdnom,
						name    : context.getStore(InfoStore).getState().general.get("nom"),
						nomVern : context.getStore(InfoStore).getState().general.get("nomVern"),
						rang    : context.getStore(InfoStore).getState().general.get("rang")
					});
				});
		}
	},

	"taxon": {
		path: "/atlas/:name/:cdnom",
		method: "get",
		handler: Taxon,
		label: "taxon",
		page: "taxon",
		action : (context, payload) => {
			context.dispatch(Event.RESET_SEARCH_CHILDS);
			var atlasName = payload.get("params").get("name");

			var cdnom = payload.get("params").get("cdnom");
			var atlasCdnom = atlas[atlasName].cdnom;
			var limit = atlas[atlasName].limit;

			return TaxonAction.getData(context, { 
				cdnom: cdnom, 
				limit: limit
			}).then(function() {
				var name = context.getStore(InfoStore).getState().general.get("nom");
				context.dispatch(Event.UPDATE_TITLE, `WebOb's | Atlas des ${atlasName} | ${name}`);
				context.dispatch(Event.ATLAS, {
					cdnom: atlasCdnom,
					name: atlasName
				});
			});
		}
	}
};
