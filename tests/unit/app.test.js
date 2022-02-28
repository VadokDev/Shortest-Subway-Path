/**
 * @jest-environment @stryker-mutator/jest-runner/jest-env/jsdom
 */

const app = require('../../src/app');

jest.mock('../../src/useCases', () => ({
  renderShortestPath: { execute: () => 'A - B' },
}));

describe('App test suite', () => {
  const buttonClickMock = (name, cb) => cb({ preventDefault: jest.fn() }, name);
  const elementMocks = {
    networkInput: { value: '' },
    startInput: { value: '' },
    endInput: { value: '' },
    colorInput: { options: [{ value: '' }], selectedIndex: 0 },
    solveButton: { addEventListener: jest.fn(buttonClickMock) },
    path: { value: '', innerHTML: '' },
  };

  it('should add event listeners to the DOM', () => {
    expect.assertions(9);
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    document.getElementById = jest.fn((elementId) => elementMocks[elementId]);

    app();

    document.addEventListener('DOMContentLoaded', () => {
      expect(addEventListenerSpy).toBeCalledWith('DOMContentLoaded', expect.any(Function));
      expect(document.getElementById).toBeCalledWith('networkInput');
      expect(document.getElementById).toBeCalledWith('startInput');
      expect(document.getElementById).toBeCalledWith('endInput');
      expect(document.getElementById).toBeCalledWith('colorInput');
      expect(document.getElementById).toBeCalledWith('solveButton');
      expect(document.getElementById).toBeCalledWith('path');
      expect(elementMocks.solveButton.addEventListener).toBeCalledWith(
        'click',
        expect.any(Function)
      );
      expect(elementMocks.path.innerHTML).toBe('A - B');
    });

    document.dispatchEvent(
      new Event('DOMContentLoaded', {
        bubbles: true,
        cancelable: true,
      })
    );
  });
});
