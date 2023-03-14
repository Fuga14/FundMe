const { network } = require('hardhat');
const { developmentChains } = require('../helper-hardhat-config');
const DECIMALS = 8;
const INITIAL_ANSWER = 200000000000;

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  // if (chainId == '31337')
  if (developmentChains.includes(network.name)) {
    log('Local network detected! Deploying mocks...');
    await deploy('MockV3Aggregator', {
      contract: 'MockV3Aggregator',
      from: deployer,
      log: true, // means deploying "MockV3Aggregator" (tx: 0x48bdfdd64...
      args: [DECIMALS, INITIAL_ANSWER],
    });
    log('Mocks deployed!');
    log('---------------------------------------------------');
  }
};

module.exports.tags = ['all', 'mocks'];
