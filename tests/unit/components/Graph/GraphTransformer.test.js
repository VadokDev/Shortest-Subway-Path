const {
  networkWithPathTransformer,
} = require('../../../../src/components/Graph/GraphTransformers');

describe('Graph Transformer test suit', () => {
  it('networkWithPathTransformer should turn a network with path from domain to presentation layer', () => {
    const networkMock = {
      A: { color: '', nexts: ['B'] },
      B: { color: '', nexts: ['A', 'C'] },
      C: { color: '', nexts: ['B', 'D', 'G'] },
      D: { color: '', nexts: ['C', 'E'] },
      E: { color: '', nexts: ['D', 'F'] },
      F: { color: '', nexts: ['E', 'I'] },
      G: { color: 'green', nexts: ['C', 'H'] },
      H: { color: 'red', nexts: ['G', 'I'] },
      I: { color: 'green', nexts: ['H', 'F'] },
    };
    const path = ['A', 'B', 'C', 'D', 'E', 'F'];
    const expectedElements = [
      { data: { id: 'A', score: 1, group: '' }, group: 'nodes' },
      { data: { id: 'B', score: 1, group: '' }, group: 'nodes' },
      { data: { id: 'C', score: 1, group: '' }, group: 'nodes' },
      { data: { id: 'D', score: 1, group: '' }, group: 'nodes' },
      { data: { id: 'E', score: 1, group: '' }, group: 'nodes' },
      { data: { id: 'F', score: 1, group: '' }, group: 'nodes' },
      { data: { id: 'G', score: 1, group: 'green' }, group: 'nodes' },
      { data: { id: 'H', score: 1, group: 'red' }, group: 'nodes' },
      { data: { id: 'I', score: 1, group: 'green' }, group: 'nodes' },
      { data: { source: 'A', target: 'B', group: '' }, group: 'edges' },
      { data: { source: 'B', target: 'A', group: '' }, group: 'edges' },
      { data: { source: 'B', target: 'C', group: '' }, group: 'edges' },
      { data: { source: 'C', target: 'B', group: '' }, group: 'edges' },
      { data: { source: 'C', target: 'D', group: '' }, group: 'edges' },
      { data: { source: 'C', target: 'G', group: '' }, group: 'edges' },
      { data: { source: 'D', target: 'C', group: '' }, group: 'edges' },
      { data: { source: 'D', target: 'E', group: '' }, group: 'edges' },
      { data: { source: 'E', target: 'D', group: '' }, group: 'edges' },
      { data: { source: 'E', target: 'F', group: '' }, group: 'edges' },
      { data: { source: 'F', target: 'E', group: '' }, group: 'edges' },
      { data: { source: 'F', target: 'I', group: '' }, group: 'edges' },
      { data: { source: 'G', target: 'C', group: '' }, group: 'edges' },
      { data: { source: 'G', target: 'H', group: '' }, group: 'edges' },
      { data: { source: 'H', target: 'G', group: '' }, group: 'edges' },
      { data: { source: 'H', target: 'I', group: '' }, group: 'edges' },
      { data: { source: 'I', target: 'H', group: '' }, group: 'edges' },
      { data: { source: 'I', target: 'F', group: '' }, group: 'edges' },
      { data: { source: 'A', target: 'B', group: 'path' }, group: 'edges' },
      { data: { source: 'B', target: 'C', group: 'path' }, group: 'edges' },
      { data: { source: 'C', target: 'D', group: 'path' }, group: 'edges' },
      { data: { source: 'D', target: 'E', group: 'path' }, group: 'edges' },
      { data: { source: 'E', target: 'F', group: 'path' }, group: 'edges' },
    ];

    const elements = networkWithPathTransformer(networkMock, path);
    expect(elements).toStrictEqual(expectedElements);
  });
});
