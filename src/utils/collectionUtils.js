// Note: just works for primitive values,
// if you want to push objects, don't use this method
const pushValueIfNotExists = (array, value) => ({
  false: (val) => array.push(val),
  true: () => undefined,
}[array.includes(value)](value));

const getValSwitch = (booleanSelector, val1, val2) => ({
  true: val1,
  false: val2,
}[booleanSelector]);

module.exports = { pushValueIfNotExists, getValSwitch };
