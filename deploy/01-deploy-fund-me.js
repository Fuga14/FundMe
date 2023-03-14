// function deployFunc() {
//   console.log('Hello world');
// }
// module.exports.default = deployFunc;

const { network } = require('hardhat');

module.exports = async ({ getNamedAccounts, deployments }) => {
  //   const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
};
