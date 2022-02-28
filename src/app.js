const { renderShortestPath } = require('./useCases');

module.exports = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const networkInput = document.getElementById('networkInput');
    const startInput = document.getElementById('startInput');
    const endInput = document.getElementById('endInput');
    const colorInput = document.getElementById('colorInput');
    const solveButton = document.getElementById('solveButton');
    const pathText = document.getElementById('path');

    solveButton.addEventListener('click', (e) => {
      e.preventDefault();
      const rawNetwork = networkInput.value;
      const start = startInput.value;
      const end = endInput.value;
      const color = colorInput.options[colorInput.selectedIndex].value;
      const graphElementId = 'mynetwork';
      const pathString = renderShortestPath.execute({
        rawNetwork,
        start,
        end,
        color,
        graphElementId,
      });
      pathText.innerHTML = pathString;
    });
  });
};
