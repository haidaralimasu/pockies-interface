import React, { useEffect } from "react";
import { useEthers } from "@usedapp/core";
import Web3Modal from "web3modal";
import { Button } from "../Button";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Torus from "@toruslabs/torus-embed";
import { infuraId, supportedChainId, rpcUrl } from "../../config";

const WalletConnectButton = () => {
  const { account, activate, deactivate, chainId, switchNetwork } = useEthers();
  const { error } = useEthers();
  useEffect(() => {
    if (chainId != supportedChainId) {
      switchNetwork(supportedChainId);
    }
  }, [error, account]);

  const activateProvider = async () => {
    const providerOptions = {
      injected: {
        display: {
          name: "Metamask",
          description: "Connect with the provider in your Browser",
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          bridge: "https://bridge.walletconnect.org",
          infuraId: infuraId,
        },
      },
      coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
          appName: "Pockies Mint",
          infuraId: infuraId,
          rpc: rpcUrl,
          chainId: supportedChainId,
          darkMode: false,
        },
      },
      torus: {
        package: Torus,
        options: {
          networkParams: {
            host: rpcUrl,
            chainId: supportedChainId,
            networkId: supportedChainId,
          },
          config: {
            buildEnv: "development",
          },
        },
      },
    };

    const web3Modal = new Web3Modal({
      providerOptions,
    });
    try {
      const provider = await web3Modal.connect();
      await activate(provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {account ? (
        <Button className="btn btn-danger" onClick={() => deactivate()}>
          Disconnect
        </Button>
      ) : (
        <Button className="btn btn-success" onClick={activateProvider}>
          Connect
        </Button>
      )}
    </div>
  );
};

export default WalletConnectButton;
