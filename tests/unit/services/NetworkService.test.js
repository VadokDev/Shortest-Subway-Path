const { NetworkService } = require('../../../src/services/NetworkService');

describe('NetworkService tests', () => {
  const networkMock = {
    A: { color: '', nexts: ['B'] },
    B: { color: '', nexts: ['A', 'C'] },
    C: { color: '', nexts: ['B', 'D', 'G'] },
    D: { color: '', nexts: ['C', 'E'] },
    E: { color: '', nexts: ['D', 'F'] },
    F: { color: '', nexts: ['E', 'I'] },
    I: { color: 'green', nexts: ['H', 'F'] },
    H: { color: 'red', nexts: ['G', 'I'] },
    G: { color: 'green', nexts: ['C', 'H'] },
  };

  it('should create a network by receiving a raw description string with one line', () => {
    const networkService = NetworkService();
    const rawNetwork = '3\nA\nB\nC Rojo\n1\nA-B-C';
    const expectedNetwork = {
      A: { color: '', nexts: ['B'] },
      B: { color: '', nexts: ['A', 'C'] },
      C: { color: 'red', nexts: ['B'] },
    };

    const network = networkService.create(rawNetwork);
    expect(network).toStrictEqual(expectedNetwork);
  });

  it('should create a network by receiving a raw description with 9 stations and 6 lines', () => {
    const networkService = NetworkService();
    const rawNetwork =
      '9\nA Rojo\nB\nC\nD\nE\nF\nG\nH\nI\n6\nA-B-C\nC-D-E\nE-F-G\nG-E-C\nG-H-I\nI-E-F';
    const expectedNetwork = {
      A: { color: 'red', nexts: ['B'] },
      B: { color: '', nexts: ['A', 'C'] },
      C: { color: '', nexts: ['B', 'D', 'E'] },
      D: { color: '', nexts: ['C', 'E'] },
      E: { color: '', nexts: ['D', 'F', 'G', 'C', 'I'] },
      F: { color: '', nexts: ['E', 'G'] },
      G: { color: '', nexts: ['F', 'E', 'H'] },
      H: { color: '', nexts: ['G', 'I'] },
      I: { color: '', nexts: ['H', 'E'] },
    };

    const network = networkService.create(rawNetwork);
    expect(network).toStrictEqual(expectedNetwork);
  });

  it('should create an empty network', () => {
    const networkService = NetworkService();
    const rawNetwork = '0\n\0';
    const expectedNetwork = {};

    const network = networkService.create(rawNetwork);
    expect(network).toStrictEqual(expectedNetwork);
  });

  it('should create a network by receiving a raw description string with three lines', () => {
    const networkService = NetworkService();
    const rawNetwork =
      '9\nA\nB\nC\nD\nE\nF\nG Verde\nH Rojo\nI Verde\n3\nA-B-C\nC-D-E-F\nC-G-H-I-F';
    const expectedNetwork = { ...networkMock };

    const network = networkService.create(rawNetwork);
    expect(network).toStrictEqual(expectedNetwork);
  });

  it('should return the shortest path for a network', () => {
    const networkService = NetworkService();
    const network = { ...networkMock };
    const expectedPaths = [
      ['A', 'B', 'C', 'H', 'F'],
      ['A', 'B', 'C', 'G', 'I', 'F'],
      ['A', 'B', 'C', 'D', 'E', 'F'],
      ['D', 'C', 'G', 'H'],
      ['D', 'C', 'H'],
    ];

    const paths = [
      networkService.getShortestPath(network, 'A', 'F', 'red'),
      networkService.getShortestPath(network, 'A', 'F', 'green'),
      networkService.getShortestPath(network, 'A', 'F', ''),
      networkService.getShortestPath(network, 'D', 'H', ''),
      networkService.getShortestPath(network, 'D', 'H', 'red'),
    ];

    expect(paths[0]).toStrictEqual(expectedPaths[0]);
    expect(paths[1]).toStrictEqual(expectedPaths[1]);
    expect(paths[2]).toStrictEqual(expectedPaths[2]);
  });
});
