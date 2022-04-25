import { Element } from "../models/Element";
import { Mesh } from "../models/Mesh";
import { Node } from "../models/Node";
import { Value } from "../models/Value";

/* It takes an event object, checks if the ids are unique, and returns a mesh object */
export class InputValidator {
	static validateInput(event): Mesh {
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

			return mesh;
		} catch (e) {
			throw new Error("Failed to parse mesh. Invalid input: " + e);
		}
	}

	private static checkIfIdUnique(ids: number[]): void {
		let length = ids.length;
		let set = new Set(ids);

		if (length !== set.size) {
			throw new Error("Ids have to be unique. Aborting.");
		}
	}
}
