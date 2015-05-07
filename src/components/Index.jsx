var React           = require("react"),
		NavIndex        = require("./NavIndex"),
		elementNavIndex = require("../configs/elementNavIndex");
if (process.env.BROWSER) {
	require("../assets/css/base/index.css");
}

var Index = React.createClass({
	render() {
		return (
			<div className="index">
				<div className="wrapper">
					<div className="title card">
						<h1 className="logo">
							<span>Conservatoire d'espaces naturels</span>
						</h1>
					</div>
					<NavIndex elements={elementNavIndex} />
				</div>
			</div>
		);
	}
});

module.exports = Index;
