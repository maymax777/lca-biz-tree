import Node from "../../models/Node";

export type ISelected = {
  lca: number | undefined;
  node1: number | undefined;
  node2: number | undefined;
};

export type ITreeProps = {
  tree: Node | null;
  selected: ISelected | undefined;
};

export type INodeDatum = {
  name: string;
};

export type IRenderNode = {
  toggleNode: () => void;
  nodeDatum: INodeDatum;
};
