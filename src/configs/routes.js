import {infos, geojson} from "../actions/TaxonActions";
import Index from "../components/Index";
import Taxon from "../components/Taxon";

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

	"papillons": {
		path: "/papillons",
		method: "get",
		label: "Papillons",
		page: "papillons",
		handler: Taxon,
		action: (context, payload, done) => {
			context.dispatch("UPDATE_TITLE", { label: "WebOb's | Atlas Papillons"});
			context.dispatch("RECEIVE_INFO", { info: infos["185214"] });
			done();
		}
	}
};
