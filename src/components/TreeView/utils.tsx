import Node from "../../models/Node";
import { RawNodeDatum, TreeNodeDatum } from "react-d3-tree/lib/types/common";
import { ISelected } from "./type";

export function renderCustomNode(
  nodeDatum: TreeNodeDatum,
  selected: ISelected | undefined
) {
  const { name } = nodeDatum;
  const isSelected: boolean =
    selected?.node1 === +name || selected?.node2 === +name;
  const isLCA: boolean = selected?.lca === +name;
  const selectedStyle: string =
    (isSelected ? " fill-indigo-300 stroke-gray-100 " : "") +
    (isLCA ? " fill-yellow-600 stroke-gray-100 " : "") +
    (!isSelected && !isLCA && " stroke-green-500 fill-white stroke-1 ");

  return (
    <g
      className={
        "hover:stroke-2 hover:stroke-yellow-200 transition-all delay-300" +
        selectedStyle
      }
    >
      <rect className="w-12 h-12" x="-22" y="-20" rx="16" />
      <text x="-2" y="8">
        {nodeDatum.name}
      </text>
    </g>
  );
}

export const parse = (tree: Node | null): RawNodeDatum | RawNodeDatum[] => {
  if (!tree) return {} as RawNodeDatum;

  const next = (node: Node): RawNodeDatum => {
    const newNode: RawNodeDatum = { name: node.value.toString() };
    const children: RawNodeDatum[] = [];

    if (node.left) {
      const left = next(node.left);
      children.push(left);
    }
    if (node.right) {
      const right = next(node.right);
      children.push(right);
    }
    newNode.children = children;

    return newNode;
  };
  let chart = next(tree);

  return chart;
};
