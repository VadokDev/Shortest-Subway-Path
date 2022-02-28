/**
 * @jest-environment @stryker-mutator/jest-runner/jest-env/jsdom
 */

const { GraphComponent } = require("../../../../src/components/Graph/GraphComponent");

describe("GraphComponent test suite", () => {
  const graphElementId = "network";
  beforeEach(() => {
    const emptyObject = {};
    HTMLCanvasElement.prototype.getContext = () => emptyObject;
    const graphElement = document.createElement("div");
    graphElement.setAttribute("id", graphElementId);
    document.body.appendChild(graphElement);
  });

  afterEach(() => {
    document.getElementById(graphElementId).remove();
  });

  it("should add cytoscape class to the element after rendering", () => {
    const graphElement = document.getElementById(graphElementId);
    const graphComponent = GraphComponent();
    const network = {};
    const path = [];
    expect(graphElement).not.toBeNull();

    graphComponent.render({ network, path, elementId: graphElementId });
    expect(graphElement.getAttribute("class")).toMatch(/cytoscape/);
  });
});
