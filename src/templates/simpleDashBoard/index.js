if (process.env.BROWSER) {
	require("./css/main.css")
	require("bootstrap/dist/css/bootstrap.min.css");
	require("./css/reset.css");
	require("./css/utils.css");
	require("./css/fonts/fonts.css");
}

module.exports = {
	"index": require("./Index.tpl"),
	"atlas": require("./Atlas.tpl"),
	"taxon": require("./Taxon.tpl")
};