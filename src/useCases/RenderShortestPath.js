const { colorsMapper } = require('../utils/constants');

const RenderShortestPath = (NetworkService, GraphComponent) => {
  const networkService = NetworkService;
  const graphComponent = GraphComponent;

  const execute = ({ rawNetwork, start, end, color, graphElementId }) => {
    const network = networkService.create(rawNetwork);
    const path = networkService.getShortestPath(network, start, end, colorsMapper[color]);
    const pathString = path.join(' - ');

    graphComponent.render({ network, path, elementId: graphElementId });
    return pathString;
  };

  return { execute };
};

module.exports = { RenderShortestPath };
