if (process.env.BROWSER) {
	require('./css/reset.css');
	require('./css/fonts/fonts.css');
	require('./css/utils.css');
	require('./css/main.css');
	require('../../../node_modules/leaflet/dist/leaflet.css');
}

export default {
	"atlas": require("./Atlas.tpl"),
	"taxon": require("./Taxon.tpl"),
	"index": require("./Index.tpl")
};
