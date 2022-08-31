import { ethers } from 'ethers'
import { pockiesAddress, infuraId } from '../config'
import WalletConnectProvider from '@walletconnect/web3-provider'
import pockiesAbi from '../abis/contracts/Pockies.sol/Pockies.json'

export const pockiesInterface = new ethers.utils.Interface(pockiesAbi)
