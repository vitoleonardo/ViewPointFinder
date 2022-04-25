import { Element } from "./Element";
import { Node } from "./Node";
import { Value } from "./Value";

export interface Mesh {
	elements: Element[];
	values: Value[];
	nodes: Node[];
}
