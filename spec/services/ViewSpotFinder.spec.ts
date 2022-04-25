import { ViewSpotFinder } from "../../services/ViewSpotFinder";

import validMesh from "../mockData/mesh.json";
import invalidMesh from "../mockData/invalid_mesh.json";

describe("Testing Methods from ViewSpotFinder", () => {
	const viewSpotFinder = new ViewSpotFinder();

	it("Should return an array of N elements if enoguh points are available", () => {
		let spots = viewSpotFinder.findSpots(validMesh, 5);
		expect(spots.length).toEqual(5);

		spots = viewSpotFinder.findSpots(validMesh, 3);
		expect(spots.length).toEqual(3);

		spots = viewSpotFinder.findSpots(validMesh, 1);
		expect(spots.length).toEqual(1);
	});

	it("Should throw if input mesh is not valid", () => {
		expect(viewSpotFinder.findSpots(invalidMesh, 5)).toThrow();

		expect(viewSpotFinder.findSpots(invalidMesh, 10)).toThrow();
	});
});
