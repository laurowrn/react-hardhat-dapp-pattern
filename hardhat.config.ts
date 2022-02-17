import {HardhatUserConfig} from 'hardhat/types';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import {node_url, accounts} from './utils/network';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.4',
  },
  networks: {
    hardhat:{

    },
    rinkeby: {
      url: node_url('rinkeby'),
      accounts: accounts('rinkeby'),
    },
  },
  namedAccounts: {
    owner: 0,
    recipient: 1,
  },
  paths: {
    sources: 'contracts',
    deployments: 'frontend/src/hardhat/deployments'
  },
};
export default config;