const { RenderShortestPath } = require("../../../src/useCases/RenderShortestPath");

describe("RenderShortestPath UseCase test suite", () => {
  it("should render the given raw network with the shortest path between two stations", () => {
    const rawNetwork = "2\nA\nB\n1\nA-B";
    const network = { A: {}, B: {} };
    const pathMock = ["A", "B"];
    const networkService = {
      create: jest.fn(() => network),
      getShortestPath: jest.fn(() => pathMock),
    };
    const graphComponent = { render: jest.fn() };
    const renderShortestPath = RenderShortestPath(networkService, graphComponent);
    const start = "A";
    const end = "B";
    const color = "Rojo";
    const graphElementId = "mynetwork";
    const expectedPath = "A - B";

    const path = renderShortestPath.execute({ rawNetwork, start, end, color, graphElementId });

    expect(networkService.create).toBeCalledWith(rawNetwork);
    expect(networkService.getShortestPath).toBeCalledWith(network, start, end, "red");
    expect(graphComponent.render).toBeCalledWith({
      network,
      path: pathMock,
      elementId: graphElementId,
    });
    expect(path).toBe(expectedPath);
  });
});
