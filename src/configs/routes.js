import TaxonAction from "../actions/TaxonAction";
import AtlasAction from "../actions/AtlasAction";
import ApplicationStore from "../stores/ApplicationStore";
import AtlasStore	 from "../stores/AtlasStore";
import TaxonStore	 from "../stores/TaxonStore";
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
			let atlasName = payload.get("params").get("name");
			let cdnom = atlas[atlasName].cdnom;
			let auth = context.getStore(ApplicationStore).getState().auth;
			context.dispatch(Event.UPDATE_TITLE, "Atlas des " + atlasName);
			return AtlasAction.getData(context, { cdnom: cdnom, auth: auth })
				.then(() => {});
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
			let atlasName = payload.get("params").get("name");

			let cdnom = payload.get("params").get("cdnom");
			let atlasCdnom = atlas[atlasName].cdnom;

			let auth = context.getStore(ApplicationStore).getState().auth;
			return TaxonAction.getData(context, { 
				cdnom: cdnom,
				auth: auth
			}).then(() => {
				let name = context.getStore(TaxonStore).getState().info.get("nom");
				context.dispatch(Event.UPDATE_TITLE, `WebOb's | Atlas des ${atlasName} | ${name}`);
				context.dispatch(Event.ATLAS, {
					cdnom: atlasCdnom,
					name: atlasName
				});
			});
		}
	}
};
