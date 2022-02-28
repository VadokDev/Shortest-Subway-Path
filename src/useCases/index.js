const { GraphComponent } = require('../components/Graph/GraphComponent');
const { NetworkService } = require('../services/NetworkService');
const { RenderShortestPath } = require('./RenderShortestPath');

const graphComponent = GraphComponent();
const networkService = NetworkService();
const renderShortestPath = RenderShortestPath(networkService, graphComponent);

module.exports = { renderShortestPath };
