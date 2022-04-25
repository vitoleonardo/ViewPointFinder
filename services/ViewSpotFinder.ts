import { Element } from "../models/Element";
import { Mesh } from "../models/Mesh";

export class ViewSpotFinder {
	/**
	 * > We sort the elements by height, then we check if the current element is a neighbour of any of the
	 * peaks we've already found. If it is, we skip it. If it isn't, we add it to the list of peaks
	 * @param {Mesh} mesh - Mesh - the mesh you want to find the peaks of
	 * @param {number} amountOfViewPoints - The amount of peaks you want to find.
	 * @returns An array of elements that are peaks.
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
