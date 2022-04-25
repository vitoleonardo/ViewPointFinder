import { Element } from "../models/Element";
import { Mesh } from "../models/Mesh";

export class ViewSpotFinder {
	/**
	 * It sorts the elements descending according to their value and then iterates over them, adding them
	 * to the result array if they are not a neighbour of a higher peak,
	 * @param {Element[]} elements - Array of elements already merged with their respective values.
	 * @param {number} amountOfViewPoints - The amount of peaks to find.
	 * @returns an array of viewpoints.
	 */
	public findSpots(elements: Element[], amountOfViewPoints: number = Infinity): Element[] {
		let peaks: Element[] = [];

		// Start with sorting elements descending according to value in O(n log n)
		const sortedElements = elements.sort((a, b) => b.value! - a.value!);

		let counter: number = 0;
		exit_loop: for (let i = 0; i < sortedElements.length - 1 && counter < amountOfViewPoints; i++) {
			// Case: plateau
			if (sortedElements[i].value === sortedElements[i + 1].value) {
				if (this.elementsAreNeighbours(sortedElements[i], sortedElements[i + 1])) {
					continue;
				}
			}

			// Case: higher neighbouring peak already found
			for (const peak of peaks) {
				if (this.elementsAreNeighbours(peak, sortedElements[i])) {
					continue exit_loop;
				}
			}

			peaks.push(sortedElements[i]);
			++counter;
		}

		return peaks;
	}

	/**
	 * > Returns true if the two elements are neighbours, false otherwise
	 * @param {Element} element1 - The first element to check
	 * @param {Element} element2 - Element - The element to check if it's a neighbour of element1
	 * @returns a boolean value.
	 */
	private elementsAreNeighbours(element1: Element, element2: Element): boolean {
		if (element1 !== element2) {
			for (const node of element1.nodes) {
				if (element2.nodes.includes(node)) {
					return true;
				}
			}
		}

		return false;
	}
}
