import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { PortisConnector } from '@web3-react/portis-connector'
import { LatticeConnector } from '@web3-react/lattice-connector'
import { TorusConnector } from '@web3-react/torus-connector'

import { FortmaticConnector } from './Fortmatic'
import { NetworkConnector } from './NetworkConnector'
import { ChainId } from '@pandaswap/sdk'

const RPC = {
  [ChainId.MAINNET]: 'https://eth-mainnet.alchemyapi.io/v2/q1gSNoSMEzJms47Qn93f9-9Xg5clkmEC',
  [ChainId.ROPSTEN]: 'https://ropsten.infura.io/v3/bd0c96c26be54dc7ab363c7e2bdfe746',
  [ChainId.AVALANCHE]: 'https://api.avax.network/ext/bc/C/rpc',
  [ChainId.FUJI]: 'https://api.avax-test.network/ext/bc/C/rpc'
}

export const network = new NetworkConnector({
  defaultChainId: 43114,
  urls: RPC
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

export const injected = new InjectedConnector({
  supportedChainIds: [
    43114, // avalanche
    43113 // fuji
  ]
})

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: {
    [ChainId.MAINNET]: RPC[ChainId.MAINNET]
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000
})

// mainnet only
export const lattice = new LatticeConnector({
  chainId: 1,
  url: RPC[ChainId.MAINNET],
  appName: 'PandaSwap'
})

// mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: process.env.REACT_APP_FORTMATIC_API_KEY ?? '',
  chainId: 1
})

// mainnet only
export const portis = new PortisConnector({
  dAppId: process.env.REACT_APP_PORTIS_ID ?? '',
  networks: [1]
})

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: RPC[ChainId.MAINNET],
  appName: 'PandaSwap',
  appLogoUrl: ''
})

// mainnet only
export const torus = new TorusConnector({
  chainId: 1
})
