import { Element } from "../models/Element";
import { Mesh } from "../models/Mesh";
import { Node } from "../models/Node";
import { Value } from "../models/Value";

/* It takes an event object, checks if the ids are unique, and returns a mesh object */
export class InputValidator {
	/**
	 * It takes an event object, checks if the ids are unique, checks if the number of elements and values
	 * are the same, and then merges the values with the elements.
	 * @returns An array of elements.
	 */
	static validateInput(event): Element[] {
		try {
			const elements = event.elements as Element[];
			const values = event.values as Value[];
			const nodes = event.nodes as Node[];

			this.checkIfIdUnique(elements.map((a) => a.id));
			this.checkIfIdUnique(values.map((a) => a.element_id));
			this.checkIfIdUnique(nodes.map((a) => a.id));

			if (values.length !== elements.length) {
				throw new Error("Element array is not the same size as value array.");
			}

			const mesh: Mesh = { elements: elements, values: values, nodes: nodes };

			return this.mergeValuesWithElements(mesh);
		} catch (e) {
			throw new Error("Failed to parse mesh. Invalid input: " + e);
		}
	}

	/**
	 * It checks if the given array of numbers contains unique values
	 * @param {number[]} ids - number[] - an array of ids that will be used to create the objects.
	 */
	private static checkIfIdUnique(ids: number[]): void {
		let length = ids.length;
		let set = new Set(ids);

		if (length !== set.size) {
			throw new Error("Ids have to be unique. Aborting.");
		}
	}

	/**
	 * It takes a mesh and returns an array of elements with values
	 * @param {Mesh} mesh - Mesh - the mesh object that contains the elements and values
	 * @returns An array of elements with the value property added.
	 */
	private static mergeValuesWithElements(mesh: Mesh): Element[] {
		let elements: Element[] = [];

		mesh.elements.map((a) => {
			const value = mesh.values.find((b) => b.element_id === a.id);
			if (value) {
				const element: Element = {
					id: a.id,
					nodes: a.nodes,
					value: value.value,
				};
				elements.push(element);
			}
		});

		return elements;
	}
}
