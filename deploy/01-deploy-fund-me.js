// function deployFunc() {
//   console.log('Hello world');
// }
// module.exports.default = deployFunc;

// const helperConfig = require('../helper-hardhat-config');
// const network = helperConfig.network;

const { network } = require('hardhat');
const {
  networkConfig,
  developmentChains,
} = require('../helper-hardhat-config');

module.exports = async ({ getNamedAccounts, deployments }) => {
  //   const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  // if chainId is X use address Y
  // const ethUsdPriceFeedAddress = networkConfig[chainId]['ethUsdPriceFeed'];
  let ethUsdPriceFeedAddress;
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get('MockV3Aggregator');
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]['ethUsdPriceFeed'];
  }

  const fundMe = await deploy('Fund', {
    from: deployer,
    args: [ethUsdPriceFeedAddress], // put price feed address,
    log: true,
  });
  log('---------------------------------------------------');
};

module.exports.tags = ['all', 'fundme'];
