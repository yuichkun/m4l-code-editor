/* eslint-disable no-console */
const mockMaxIntf = {
  outlet(...args) {
    console.log('MAX OUTLET', ...args);
  },
};

export default mockMaxIntf;
