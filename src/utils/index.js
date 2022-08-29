import { ethers } from "ethers";
import { pockiesAddress, infuraId } from "../config";
import WalletConnectProvider from "@walletconnect/web3-provider";
import pockiesAbi from "../abis/contracts/Pockies.sol/Pockies.json";

const pockiesInterface = new ethers.utils.Interface(pockiesAbi);

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

export const pockiesContract = new ethers.Contract(
  pockiesAddress,
  pockiesInterface,
  signer
);

export const walletConnectProvider = new WalletConnectProvider({
  infuraId: infuraId,
  qrcode: true,
});
