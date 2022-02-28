const networkWithPathTransformer = (network, path) => {
  const stations = Object.keys(network);
  const nodes = stations.map((station) => ({
    data: { id: station, group: network[station].color, score: 1 },
    group: 'nodes',
  }));

  const edges = stations
    .map((source) =>
      network[source].nexts.map((target) => ({
        data: { source, target, group: '' },
        group: 'edges',
      }))
    )
    .flat();

  const pathEdges = path
    .slice(0, -1)
    .map((pathStation, i) => [pathStation, path[i + 1]])
    .map(([source, target]) => ({
      data: { source, target, group: 'path' },
      group: 'edges',
    }));

  return [...nodes, ...edges, ...pathEdges];
};

module.exports = { networkWithPathTransformer };
