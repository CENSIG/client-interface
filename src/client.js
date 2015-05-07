/**
 * Gateway for client side
 * @author Jean BOUDET
 */
import React from "react";
import app   from "./app";

if (typeof window !== "undefined") {

	// Load state of app
	app.rehydrate(window.states, (err, context) => {
		if (err) throw err;
		React.render(context.createElement(), document.querySelector("div.main"), () => {
			console.log("Render");
		});
	});

}
