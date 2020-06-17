/**
 * Return ShallowWrapper containing node(s) with given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-testid attr for search.
 * @returns {ShallowWrapper}
 */
const findByTestId = (wrapper, val) => {
  return wrapper.find(`[data-testid='${val}']`);
};

module.exports = { findByTestId };
