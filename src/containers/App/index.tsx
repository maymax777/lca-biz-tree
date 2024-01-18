import React, { useRef, useState } from "react";
import "./App.css";
import { TreeView, Button, Input } from "../../components";
import Node, { deserializeBT } from "../../models/Node";
import { ISelected } from "../../components/TreeView/type";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const node1Ref = useRef<HTMLInputElement>(null);
  const node2Ref = useRef<HTMLInputElement>(null);

  const [tree, setTree] = useState<Node | null>(null);
  const [selected, setSelected] = useState<ISelected>();

  // Create binary tree from inputed number array
  const createTree = () => {
    const nodes: (number | null)[] = JSON.parse(inputRef.current?.value || "");
    const tree = deserializeBT([...nodes]);
    if (tree) {
      setTree(tree);
    }
  };

  // Find LCA if two nodes are inputed properly
  const findLCA = (
    node: Node | null,
    p: number,
    q: number
  ): Node | undefined => {
    if (!node) return undefined;
    if (node?.value === p || node?.value === q) return node;

    const left = findLCA(node!.left, p, q);
    const right = findLCA(node!.right, p, q);

    if (left && right) return node!;
    return left ? left : right;
  };

  const onNodeInput = () => {
    const [node1, node2] = [
      Number(node1Ref.current?.value),
      Number(node2Ref.current?.value),
    ];
    const lca = node1 && node2 ? findLCA(tree, node1, node2)?.value : undefined;

    setSelected({
      lca: lca,
      node1: node1,
      node2: node2,
    });
  };

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-screen h-screen flex flex-col justify-center items-center">
    </div>
  );
}

export default App;
