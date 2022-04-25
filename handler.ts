"use strict";

import { Element } from "./models/Element";
import { Mesh } from "./models/Mesh";
import { ViewSpotFinder } from "./services/ViewSpotFinder";
import { InputValidator } from "./validator/MeshValidator";

/* The function that will be called when the lambda is invoked. It takes a mesh object as argument and returns the n 
highest viewspots. */
module.exports.findViewSpot = async (event) => {
	try {
		const amountOfSpotsToFind: number = 5;
		const start = new Date().getTime();

		const mesh: Mesh = InputValidator.validateInput(event);

		const viewSpotFinder: ViewSpotFinder = new ViewSpotFinder();
		const spots: Element[] = viewSpotFinder.findSpots(mesh, amountOfSpotsToFind);

		const end = new Date().getTime() - start;
		console.log("Elapsed time in ms: " + end);

		return { spots: spots };
	} catch (e) {
		return { message: "Error executing Lambda: " + e };
	}
};
