import React, { useState, useEffect } from "react";
import {
  useMaxSupply,
  useTotalSupply,
  useMaxPockiesPerTx,
  useMaxPockiesPerWallet,
  usePrice,
  useTotalMinted,
  usePresale,
} from "../../hooks/useContract";
import { useEthers } from "@usedapp/core";
import { Button } from "../Button";
import WalletConnectButton from "../WalletConnectButton";
import { ethers } from "ethers";
import { expressUrl } from "../../config";
import axios from "axios";
import { pockiesContract, walletConnectProvider } from "../../utils";

const Minter = () => {
  const { account } = useEthers();
  const userAccount = account ? account : ethers.constants.AddressZero;

  const totalSupply = useTotalSupply();
  const formattedTotalSupply = totalSupply ? totalSupply.toNumber() : 0;
  const maxSupply = useMaxSupply();
  const formattedMaxSupply = maxSupply ? maxSupply.toNumber() : 10000;
  const price = usePrice();
  const formattedPrice = price ? price.toString() : 0;
  const maxPockiesPerTx = useMaxPockiesPerTx();
  const formattedMaxPockiePerTx = maxPockiesPerTx
    ? maxPockiesPerTx.toNumber()
    : 0;
  const maxPockiesPerWallet = useMaxPockiesPerWallet();
  const formattedMaxPockiesPerWallet = maxPockiesPerWallet
    ? maxPockiesPerWallet.toNumber()
    : 0;
  const totalMinted = useTotalMinted(userAccount);
  const formattedTotalMinted = totalMinted ? totalMinted.toNumber() : 0;
  const isPresale = usePresale();
  const formattedIsPresale = isPresale ? isPresale : false;

  const [hexProof, setHexProof] = useState([]);
  const [amount, setAmount] = useState(1);
  const [waiting, setWaiting] = useState(false);

  const incrementAmount = () => {
    if (amount < formattedMaxPockiePerTx) {
      setAmount(amount + 1);
    }
  };

  const decrementAmount = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };

  const getHexProof = async () => {
    try {
      const res = await axios.get(`${expressUrl}/${userAccount}`);
      setHexProof(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const whitelistMint = async () => {
    try {
      const txCost = Number(formattedPrice) * amount;
      const tx = await pockiesContract.mintPreSale(amount, hexProof, {
        value: txCost.toString(),
      });
      tx.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const mint = async () => {
    try {
      const txCost = Number(formattedPrice) * amount;
      const tx = await pockiesContract.mintPublicSale(amount, {
        value: txCost.toString(),
      });
      tx.wait();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (account && formattedIsPresale == true) {
      getHexProof();
    }
  }, [hexProof]);

  return (
    <div>
      <div className="container">
        {/* <div className="logo">
          <img style={{ marginBottom: "30px" }} src={logo} alt="logo" />
        </div> */}
        <h1 style={{ marginBottom: "20px" }}>
          {formattedTotalSupply}/{formattedMaxSupply}
        </h1>
        {account ? (
          <>
            {formattedIsPresale ? (
              <div>
                {waiting ? (
                  <Button buttonSize="btn--wide" buttonColor="blue">
                    Please Wait
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => decrementAmount()}
                      className="margin-btn"
                    >
                      -
                    </Button>
                    <Button
                      onClick={() => whitelistMint()}
                      buttonSize="btn--wide"
                      buttonColor="blue"
                    >
                      Mint {amount} Onliners
                    </Button>
                    <Button
                      onClick={() => incrementAmount()}
                      className="margin-btn"
                    >
                      +
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <div>
                {waiting ? (
                  <Button buttonSize="btn--wide" buttonColor="blue">
                    Please Wait
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => decrementAmount()}
                      className="margin-btn"
                      buttonSize="btn--medium"
                      buttonColor="blue"
                    >
                      -
                    </Button>
                    <Button
                      onClick={() => mint()}
                      buttonSize="btn--wide"
                      buttonColor="blue"
                    >
                      Mint {amount} Onliners
                    </Button>
                    <Button
                      onClick={() => incrementAmount()}
                      className="margin-btn"
                      buttonSize="btn--medium"
                      buttonColor="blue"
                    >
                      +
                    </Button>
                  </>
                )}
              </div>
            )}
          </>
        ) : (
          <WalletConnectButton />
        )}
        <div style={{ textAlign: "center" }}>
          <p style={{ marginTop: "20px" }}>
            Price: {formattedPrice} {ethers.constants.EtherSymbol}
          </p>
          {formattedIsPresale ? (
            <p style={{ marginTop: "10px" }}>Status: Presale</p>
          ) : (
            <p style={{ marginTop: "10px" }}>Status: Publicsale</p>
          )}
          <p style={{ marginTop: "10px" }}>
            Your Mint: {formattedTotalMinted}/{formattedMaxPockiesPerWallet}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Minter;
