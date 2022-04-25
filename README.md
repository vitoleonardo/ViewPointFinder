# Coding challenge: ViewPointFinder

# Table of Contents

1. [Task](#task)
2. [Data Fields](#datafields)
3. [Run](#run)

<a id="task"></a>

## Task

There is a map excerpt of a hilly landscape. We call it a mesh. The mesh is partitioned in triangles; we call them elements. For each element a scalar value is assigned, which represents the average spot height in this triangle as compared to the sea level.
Mesh definition: A mesh is a collection of elements and nodes. Each node is a location on the map, given as a 2-dimensional point. It has an identification number (ID), two coordinates and can serve as a vertex for an element. Every element has an ID and is defined by three vertices – by three node IDs.

Given a mesh and an integer number N, find the first N view spots ordered by the spot height starting from the highest to the lowest.

<a id="datafields"></a>

## Data Fields

| Field      | Data Type | Description                |
| ---------- | --------- | -------------------------- |
| element_id | number    | Unique ID for each element |
| node_id    | number    | Unique ID for each node    |
| value      | number    | Height of an element       |
| x, y       | number    | Coordinates of a node      |

<a id="run"></a>

## Run

To configure the amount of viewpoints please edit constant 'AMOUNT_SPOTS_TO_FIND' in handler.ts. By standard it will find all spots.
Elapsed time on my machine (Macbook Pro 2019) to find 10000: 857ms and 20000: 3300ms.

```bash
serverless invoke local --function findViewSpot -p <mesh file>
```
