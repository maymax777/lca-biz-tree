import Node, { deserializeBT } from "../Node";

describe("deserializes BT correctly", () => {
  const dfs = (node: Node | null, preOrder: number[]): void => {
    if (!node) {
      return;
    }

    preOrder.push(node.value);
    dfs(node.left, preOrder);
    dfs(node.right, preOrder);
  };

  it("should correctly work with a raw array", () => {
    const serializedArray = [3, 9, 7, 2, 6, null, 4];
    const tree = deserializeBT(serializedArray);

    expect(tree).toMatchSnapshot();

    const preOrder: number[] = [];
    dfs(tree, preOrder);

    expect(preOrder).toStrictEqual([3, 9, 2, 6, 7, 4]);
  });

  it("should work with json array", () => {
    const stringArray = "[3, 9, 7, 2, 6, null, 4]";
    const tree = deserializeBT(JSON.parse(stringArray));

    expect(tree).toMatchSnapshot();

    const preOrder: number[] = [];
    dfs(tree, preOrder);

    expect(preOrder).toStrictEqual([3, 9, 2, 6, 7, 4]);
  });
});
