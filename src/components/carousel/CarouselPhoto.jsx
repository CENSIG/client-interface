import React from "react";
import Carousel from "nuka-carousel";
import {connectToStores}  from "fluxible/addons";
import PhotoStore from "../../stores/PhotoStore";
import {NavLink} from "fluxible-router";

import style from "./style";

class CarouselPhoto extends React.Component
{
	constructor(props) {
		super(props);	
	}

	_getCarouselItem() {
		let items = this.props.photos.map((photo, index) => {
			let url = `http://192.168.1.55/${photo.get("urlPhotoResize")}` 
			let params = {
				name: this.context.atlasUriName,
				cdnom: photo.get("cdref")
			};
			return (
				<figure key={index} style={style.figure}>
					<img style={style.img} alt={photo.get("nom")} src={url} />
					<figcaption>
						<NavLink routeName="taxon" navParams={params}>{photo.get("nom")}</NavLink>
					</figcaption>
				</figure>
			);
		});

		return items;
	}

	render() {
		let items = this._getCarouselItem();
		return (items.size === 0)
			? <p>Pas de photo trouvée</p>
			: (
				<Carousel>
					{items}
				</Carousel>
			);
	}
}

CarouselPhoto.contextTypes = {
	atlasUriName: React.PropTypes.string
}

CarouselPhoto = connectToStores(CarouselPhoto, [ PhotoStore ], (context, props) => {
	return context.getStore(PhotoStore).getState();
});

export default CarouselPhoto;
