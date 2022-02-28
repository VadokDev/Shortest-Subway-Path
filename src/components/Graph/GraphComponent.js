const cytoscape = require('cytoscape');
const { networkWithPathTransformer } = require('./GraphTransformers');

const GraphComponent = () => {
  const render = ({ network, path, elementId }) => {
    const elements = networkWithPathTransformer(network, path);
    return cytoscape({
      container: document.getElementById(elementId),

      layout: {
        name: 'cose',
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0,
      },

      style: [
        { selector: 'edge[group="path"]', style: { 'line-color': 'CornflowerBlue' } },
        {
          selector: 'node',
          style: {
            width: 'mapData(score, 0, 0.006769776522008331, 20, 60)',
            height: 'mapData(score, 0, 0.006769776522008331, 20, 60)',
            content: 'data(id)',
            'font-size': '12px',
            'text-valign': 'center',
            'text-halign': 'center',
            'background-color': '#555',
            'text-outline-color': '#555',
            'text-outline-width': '2px',
            color: '#fff',
            'overlay-padding': '6px',
            'z-index': '10',
          },
        },
        { selector: 'node[group="red"]', style: { 'background-color': 'red' } },
        { selector: 'node[group="green"]', style: { 'background-color': 'green' } },
      ],
      elements,
    });
  };

  return { render };
};

module.exports = { GraphComponent };
