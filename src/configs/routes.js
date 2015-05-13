import TaxonAction from "../actions/TaxonAction";
import Index		   from "../components/Index";
import Atlas		   from "../components/Atlas";

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

	"papillons": {
		path    : "/papillons",
		cdnom		: "185214",
		method  : "get",
		label   : "Papillons",
		page    : "papillons",
		handler : Atlas,
		action  : (context, payload, done) => {
			context.dispatch("UPDATE_TITLE", { label: "WebOb's | Atlas des papillons" });
			TaxonAction.getAll(context, payload).then(function() {
				done();	
			});
		}
	}
};
