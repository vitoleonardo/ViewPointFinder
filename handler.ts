"use strict";

import { Element } from "./models/Element";
import { ViewSpotFinder } from "./services/ViewSpotFinder";
import { InputValidator } from "./validator/MeshValidator";

/* The function that will be called when the lambda is invoked. It takes a mesh object as argument and returns the n 
highest viewspots. */
module.exports.findViewSpot = async (event) => {
	const AMOUNT_SPOTS_TO_FIND: number = Infinity;

	try {
		const elements: Element[] = InputValidator.validateInput(event);

		const viewSpotFinder: ViewSpotFinder = new ViewSpotFinder();
		const spots: Element[] = viewSpotFinder.findSpots(elements, AMOUNT_SPOTS_TO_FIND);

		return { spots: spots };
	} catch (e) {
		return { message: "Error executing Lambda: " + e };
	}
};
