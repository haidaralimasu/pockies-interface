import React, { useState, useEffect } from 'react'
import {
  useMaxSupply,
  useTotalSupply,
  useMaxPockiesPerTx,
  useMaxPockiesPerWallet,
  usePrice,
  useTotalMinted,
  usePresale,
} from '../../hooks/useContract'
import { useEthers } from '@usedapp/core'
import WalletConnectButton from '../WalletConnectButton'
import { ethers } from 'ethers'
import { expressUrl } from '../../config'
import axios from 'axios'
import { pockiesAddress } from '../../config'
import { pockiesInterface } from '../../utils'
import { notifySuccess, notifyError } from '../toast'

const Minter = () => {
  const { account } = useEthers()
  const userAccount = account ? account : ethers.constants.AddressZero

  const totalSupply = useTotalSupply()
  const formattedTotalSupply = totalSupply ? totalSupply.toNumber() : 0
  const maxSupply = useMaxSupply()
  const formattedMaxSupply = maxSupply ? maxSupply.toNumber() : 10000
  const price = usePrice()
  const formattedPrice = price ? price.toString() : 0
  const maxPockiesPerTx = useMaxPockiesPerTx()
  const formattedMaxPockiePerTx = maxPockiesPerTx
    ? maxPockiesPerTx.toNumber()
    : 0
  const maxPockiesPerWallet = useMaxPockiesPerWallet()
  const formattedMaxPockiesPerWallet = maxPockiesPerWallet
    ? maxPockiesPerWallet.toNumber()
    : 0
  const totalMinted = useTotalMinted(userAccount)
  const formattedTotalMinted = totalMinted ? totalMinted.toNumber() : 0
  const isPresale = usePresale()
  const formattedIsPresale = isPresale ? isPresale : false

  const [hexProof, setHexProof] = useState([])
  const [amount, setAmount] = useState(1)
  const [waiting, setWaiting] = useState(false)

  const incrementAmount = () => {
    if (amount < formattedMaxPockiePerTx) {
      setAmount(amount + 1)
    }
  }

  const decrementAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1)
    }
  }

  // const getHexProof = async () => {
  //   try {
  //     const res = await axios.get(`${expressUrl}/${account}`)
  //     setHexProof(res.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const whitelistMint = async () => {
    try {
      setWaiting(true)
      const txCost = Number(formattedPrice) * amount
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()

      const pockiesContract = new ethers.Contract(
        pockiesAddress,
        pockiesInterface,
        signer,
      )

      const tx = await pockiesContract.mintPreSale(amount, hexProof, {
        value: txCost.toString(),
      })
      await tx.wait()
      setWaiting(false)
      await notifySuccess('You have succesfully Minted Pockie')
      setWaiting(false)
    } catch (error) {
      setWaiting(false)
      notifyError('Something Went Wrong')
      console.log(error)
    }
  }

  const mint = async () => {
    try {
      setWaiting(true)
      const txCost = Number(formattedPrice) * amount
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()

      const pockiesContract = new ethers.Contract(
        pockiesAddress,
        pockiesInterface,
        signer,
      )

      const tx = await pockiesContract.mintPublicSale(amount, {
        value: txCost.toString(),
      })
      await tx.wait()
      await notifySuccess('You have succesfully Minted Pockie')
      setWaiting(false)
    } catch (error) {
      setWaiting(false)
      notifyError('Something Went Wrong')
      console.log(error)
    }
  }

  const getHexProof = () => {
    return fetch(`${expressUrl}/${account}`, { method: 'GET' })
      .then((response) => {
        return response.json()
      })
      .catch((err) => console.log(err))
  }

  const loadHexProof = () => {
    getHexProof()
      .then((data, error) => {
        if (data.error) {
          console.log(error)
        } else {
          console.log(data)
          setHexProof(data)
        }
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    loadHexProof()
  }, [])

  console.log(hexProof)

  return (
    <>
      <div className="minter-main">
        <h1 style={{ color: 'white' }} className="minter-h1">
          Pockies Mint Is Live
        </h1>

        {formattedTotalSupply < formattedMaxSupply ? (
          <div className="minting-section">
            {account ? (
              <div className="minting-section">
                <button className="connect btn btn-gradient-blue">{`${account.slice(
                  0,
                  6,
                )}...${account.slice(-6)}`}</button>

                {formattedIsPresale ? (
                  <div>
                    <button
                      className="btn btn-round amount  btn-gradient-blue"
                      onClick={() => decrementAmount()}
                    >
                      -
                    </button>
                    <button
                      onClick={() => whitelistMint()}
                      className="btn mint  btn-gradient-blue"
                    >
                      {waiting ? 'Please Wait' : `Mint ${amount}`}
                    </button>
                    <button
                      style={{ textAlign: 'center' }}
                      className="btn btn-round amount  btn-gradient-blue"
                      onClick={() => incrementAmount()}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="btn btn-round amount  btn-gradient-blue"
                      onClick={() => decrementAmount()}
                    >
                      -
                    </button>
                    <button
                      onClick={() => mint()}
                      className="btn mint  btn-gradient-blue"
                    >
                      {waiting ? 'Please Wait' : `Mint ${amount}`}
                    </button>
                    <button
                      className="btn btn-round amount  btn-gradient-blue"
                      onClick={() => incrementAmount()}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <WalletConnectButton />
              </div>
            )}
          </div>
        ) : (
          <div className="minting-section">
            <button className="connect btn btn-gradient-blue">
              Sale Ended
            </button>
          </div>
        )}

        {formattedTotalSupply < 3333 ? (
          <div className="minter-status">
            <div className="minter-status-card">
              <h6>Status</h6>

              <h2>{formattedIsPresale ? 'Presale' : 'Publicsale'}</h2>
            </div>
            <div className="vl"></div>
            <div className="minter-status-card">
              <h6>Price</h6>
              <h2>{ethers.utils.formatEther(formattedPrice)} ETH</h2>
            </div>
            <div className="vl"></div>
            {account ? (
              <>
                <div className="minter-status-card">
                  <h6>Your Mint</h6>
                  <h2>
                    {formattedTotalMinted}/{formattedMaxPockiesPerWallet}
                  </h2>
                </div>
              </>
            ) : null}
            <div className="vl"></div>
            <div className="minter-status-card">
              <h6>To Be Minted</h6>
              <h2>{3333 - formattedTotalSupply}</h2>
            </div>
          </div>
        ) : (
          <div className="minter-status">
            <div className="minter-status-card">
              <h6>Status</h6>
              <h2>Ended</h2>
            </div>
            <div className="vl"></div>
            <div className="minter-status-card">
              <h6>Price</h6>
              <h2>{ethers.utils.formatEther(formattedPrice)} ETH</h2>
            </div>
            <div className="vl"></div>
            <div className="minter-status-card">
              <h6>To Be Minted</h6>
              <h2>{3333 - formattedTotalSupply}/3333</h2>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Minter
