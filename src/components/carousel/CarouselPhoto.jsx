import React from "react";
import shouldPureComponentUpdate from "react-pure-render/function";
import Radium from "radium";
import Carousel from "nuka-carousel";
import {NavLink} from "fluxible-router";

import style from "./style";

/**
 * Component for decorated left control carousel
 * @author Jean BOUDET
 */
class ArrowLeft extends React.Component
{
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate = shouldPureComponentUpdate

	render() {
		let props = this.props;
		let styleArrow = props.currentSlide === 0 ? style.arrowHidden : style.arrowLeft;
		return <div style={[styleArrow, style.responsive]} onClick={props.previousSlide}><span style={style.textArrow}>Précédent</span></div>
	}
}

/**
 * Component for decorated right control carousel
 * @author Jean BOUDET
 */
class ArrowRight extends React.Component
{
	constructor(props) {
		super(props);
	}

	render() {
		let props = this.props;
		let styleArrow = props.currentSlide === props.slideCount-1 ? style.arrowHidden : style.arrowRight;
		return <div style={[styleArrow, style.responsive]} onClick={props.nextSlide}><span style={style.textArrow}>Suivant</span></div>
	}
}

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
		let decorators = [
			{
				component: Radium(ArrowLeft),
				position: 'CenterLeft'
			},
			{
				component: Radium(ArrowRight),
				position: 'CenterRight'
			}
		];
		return (items.size === 0)
			? <p>Pas de photo trouvée</p>
			: (
				<Carousel decorators={decorators}>
					{items}
				</Carousel>
			);
	}
}

CarouselPhoto.contextTypes = {
	atlasUriName: React.PropTypes.string
}

export default CarouselPhoto;
