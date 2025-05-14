const areObjectsEqual = (obj1: any, obj2: any) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length)
    return false;

  for (const key of keys1)
    if (obj1[key] !== obj2[key])
      return false;

  return true;
};

const groupObject = (data: any, by: any = "regionId") => {
  const groupedData = data.reduce((acc: any, obj: any) => {
    const expectedObj = obj[by];

    // Check if the regionId key exists in the accumulator
    if (acc[expectedObj]) // If it exists, push the current object to the array
      acc[expectedObj].push(obj);
    else // If it doesn't exist, create a new array with the current object
      acc[expectedObj] = [obj];


    return acc;
  }, {});

  // Convert the groupedData object back to an array of arrays
  const resultArray = Object.values(groupedData);

  return resultArray;
};

const getLeafNode: any = (node: any) => {
  if (!node.children || node.children.length === 0)
    return [node];

  let leafNodes: any = [];

  for (const child of node.children)
    leafNodes = leafNodes.concat(getLeafNode(child));

  return leafNodes;
}

const getLeafNodes: any = (data: any) => {
  const leafNodesArray = [];

  for (const node of data) {
    const leafNodes = getLeafNode(node);
    leafNodesArray.push(...leafNodes);
  }

  return leafNodesArray;
}

export {
  areObjectsEqual,
  groupObject,
  getLeafNodes
};
