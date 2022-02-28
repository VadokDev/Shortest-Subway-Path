const { pushValueIfNotExists, getValSwitch } = require('../utils/collectionUtils');

const { colorsMapper } = require('../utils/constants');

const NetworkService = () => {
  const create = (rawNetwork) => {
    const networkData = rawNetwork.split('\n');
    const totalStations = parseInt(networkData[0], 10);

    const rawStations = networkData.slice(1, totalStations + 1);
    const rawLines = networkData.slice(totalStations + 2);

    const newNetwork = rawStations.reduce((network, rawStation) => {
      const [name, color] = rawStation.split(' ');
      return { ...network, [name]: { color: colorsMapper[color], nexts: [] } };
    }, {});

    const lines = rawLines.map((rawLine) => rawLine.split('-'));

    lines.forEach((line) => {
      line.slice(1, -1).forEach((station, i) => {
        pushValueIfNotExists(newNetwork[station].nexts, line[i]);
        pushValueIfNotExists(newNetwork[station].nexts, line[i + 2]);
        pushValueIfNotExists(newNetwork[line[i]].nexts, station);
        pushValueIfNotExists(newNetwork[line[i + 2]].nexts, station);
      });
    });

    return newNetwork;
  };

  const shortestPathAlgorithm = (network, start, colorTravelCosts) => {
    const stations = Object.keys(network);
    const prevStations = {};
    const dist = {};
    const visited = {};

    stations.forEach((station) => {
      dist[station] = Infinity;
      prevStations[station] = undefined;
      visited[station] = false;
    });

    dist[start] = 0;
    stations.forEach(() => {
      const nearStation = stations
        .filter((station) => !visited[station])
        .reduce(
          (nearest, station) => getValSwitch(dist[nearest] < dist[station], nearest, station),
          '',
        );

      visited[nearStation] = true;
      network[nearStation]?.nexts
        .filter((station) => !visited[station])
        .forEach((station) => {
          const distToStation = dist[nearStation] + colorTravelCosts[network[nearStation].color];
          const isNearest = distToStation < dist[station];

          dist[station] = getValSwitch(isNearest, distToStation, dist[station]);
          prevStations[station] = getValSwitch(isNearest, nearStation, prevStations[station]);
        });
    });

    return prevStations;
  };

  const getShortestPath = (network, start, end, subwayColor) => {
    const colorTravelCosts = {
      red: getValSwitch(!!subwayColor, 0, 1),
      green: getValSwitch(!!subwayColor, 0, 1),
      '': 1,
      [subwayColor]: 1,
    };

    const stations = Object.keys(network);
    const prevStations = shortestPathAlgorithm(network, start, colorTravelCosts);
    return stations
      .reduce((path) => [prevStations[path[0]], ...path], [end])
      .filter((station) => colorTravelCosts[network[station]?.color]);
  };

  return { create, getShortestPath };
};

module.exports = { NetworkService };
