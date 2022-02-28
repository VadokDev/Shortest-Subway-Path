/**
 * @jest-environment @stryker-mutator/jest-runner/jest-env/jsdom
 */

const app = require('../../src/app');

describe('RenderShortestPath Integration tests suite', () => {
  it('should renderize the application', () => {
    const emptyObject = {};
    HTMLCanvasElement.prototype.getContext = () => emptyObject;

    const elementMocks = {
      startInput: document.createElement('input'),
      endInput: document.createElement('input'),
      networkInput: document.createElement('textarea'),
      colorInput: document.createElement('select'),
      solveButton: document.createElement('button'),
      path: document.createElement('span'),
      mynetwork: document.createElement('div'),
    };
    const rawNetwork =
      '9\nA\nB\nC\nD\nE\nF\nG Verde\nH Rojo\nI Verde\n3\nA-B-C\nC-D-E-F\nC-G-H-I-F';
    const start = 'A';
    const end = 'F';

    const colorOption = document.createElement('option');
    colorOption.value = 'Rojo';
    colorOption.text = 'Rojo';
    colorOption.selected = true;

    elementMocks.colorInput.appendChild(colorOption);

    elementMocks.networkInput.value = rawNetwork;
    elementMocks.startInput.value = start;
    elementMocks.endInput.value = end;

    Object.keys(elementMocks).forEach((elementId) => {
      elementMocks[elementId].id = elementId;
      document.body.appendChild(elementMocks[elementId]);
    });

    app();

    document.dispatchEvent(
      new Event('DOMContentLoaded', {
        bubbles: true,
        cancelable: true,
      })
    );

    elementMocks.solveButton.dispatchEvent(
      new Event('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(elementMocks.path.innerHTML).toBe('A - B - C - H - F');
  });
});
