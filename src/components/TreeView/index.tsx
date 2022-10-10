import Tree from "react-d3-tree";
import { useWindowSize } from "../../hooks/useWindowSize";
import { ITreeProps } from "./type";
import { parse, renderCustomNode } from "./utils";

const TreeView = ({ tree, selected }: ITreeProps) => {
  const { width } = useWindowSize();

  if (!tree)
    return (
      <p className="text-gray-200">
        Please add all nodes and click Create Tree button.
      </p>
    );

  return (
    <Tree
      data={parse(tree)}
      pathFunc="straight"
      orientation="vertical"
      translate={{ x: width / 2, y: 100 }}
      zoomable={false}
      renderCustomNodeElement={({ nodeDatum }) =>
        renderCustomNode(nodeDatum, selected)
      }
    />
  );
};

export default TreeView;
