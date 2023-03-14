const networkConfig = {
  5: {
    name: 'goerli',
    ethUsdPriceFeed: '0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e',
  },
  137: {
    name: 'polygon',
    ethUsdPriceFeed: '0x67935f65D1577ced9f4929D3679A157E95C1c02c',
  },
};

const developmentChains = ['hardhat', 'localhost'];

module.exports = {
  networkConfig,
  developmentChains,
};
