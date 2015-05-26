/**
 * This is element of index page navigation
 * @author Jean BOUDET
 */
export default [
	{
		title: "Atlas",
		className: "index-atlas",
		description:"Découvrez l'ensemble des données collectées par le Conservatoire d'espaces naturels sur une des thématiques suivantes:",
		themes: [
			{
				title: "Papillons",
				routeName: "atlas",
				navParams: {
					name: "papillons"
				}
			}	
		]
	}
];
