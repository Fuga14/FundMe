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
const { verify } = require('../utils/verify');

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
  const args = [ethUsdPriceFeedAddress];
  const fundMe = await deploy('Fund', {
    from: deployer,
    args: args, // put price feed address,
    log: true,
    waitConfirmations: network.config.blockConfiramtions || 1,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    // verifying
    await verify(fundMe.address, args);
  }
  log('---------------------------------------------------');
};

module.exports.tags = ['all', 'fundme'];

// Utils Folder
// 10:52:52
