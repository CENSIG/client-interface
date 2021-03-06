import Api from "../utils/Api";
import elementNavIndex from "./elementNavIndex";
import routesActions from "./routesActions";
import themesForMap from "./themesForMap";
import panelTitle from "./panelTitle";

/**
 * Configuration for application
 * @author Jean BOUDET
 */
export default {
	"api": new Api({
		"ip"   : (process.env.BROWSER) ? "127.0.0.1" : process.env.API_PORT_9000_TCP_ADDR,
		"port" : 9000,
		"name" : "api"
	}),

	"urlPhoto": "http://192.168.1.55",

	"atlas": {
		"papillons": {
			"cdnom":"185214",
			"limit": "OR"
		}
	},

	"templateName"    : "simpleDashBoard",

	"elementNavIndex" : elementNavIndex,

	"routesActions"   : routesActions,

	"themesForMap"    : themesForMap,

	"panelTitle"      : panelTitle
}
