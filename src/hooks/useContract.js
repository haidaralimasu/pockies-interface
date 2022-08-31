import { pockiesInterface } from '../utils'
import { pockiesAddress } from '../config'
import { useCall } from '@usedapp/core'
import { ethers } from 'ethers'

export const useTotalSupply = () => {
  const { value, error } =
    useCall({
      contract: new ethers.Contract(pockiesAddress, pockiesInterface),
      method: 'totalSupply',
      args: [],
    }) ?? {}
  if (error) {
    console.error(error.message)
    return undefined
  }
  return value?.[0]
}

export const useMaxSupply = () => {
  const { value, error } =
    useCall({
      contract: new ethers.Contract(pockiesAddress, pockiesInterface),
      method: 'getMaxPockies',
      args: [],
    }) ?? {}
  if (error) {
    console.error(error.message)
    return undefined
  }
  return value?.[0]
}

export const useMaxPockiesPerTx = () => {
  const { value, error } =
    useCall({
      contract: new ethers.Contract(pockiesAddress, pockiesInterface),
      method: 'getMaxPockiesPerTx',
      args: [],
    }) ?? {}
  if (error) {
    console.error(error.message)
    return undefined
  }
  return value?.[0]
}

export const useMaxPockiesPerWallet = () => {
  const { value, error } =
    useCall({
      contract: new ethers.Contract(pockiesAddress, pockiesInterface),
      method: 'getMaxPockiePerWallet',
      args: [],
    }) ?? {}
  if (error) {
    console.error(error.message)
    return undefined
  }
  return value?.[0]
}

export const usePrice = () => {
  const { value, error } =
    useCall({
      contract: new ethers.Contract(pockiesAddress, pockiesInterface),
      method: 'getPricePerPockie',
      args: [],
    }) ?? {}
  if (error) {
    console.error(error.message)
    return undefined
  }
  return value?.[0]
}

export const useTotalMinted = (user) => {
  const { value, error } =
    useCall({
      contract: new ethers.Contract(pockiesAddress, pockiesInterface),
      method: 'getTotalPockiesMinted',
      args: [user],
    }) ?? {}
  if (error) {
    console.error(error.message)
    return undefined
  }
  return value?.[0]
}

export const usePresale = () => {
  const { value, error } =
    useCall({
      contract: new ethers.Contract(pockiesAddress, pockiesInterface),
      method: 'getIsPresale',
      args: [],
    }) ?? {}
  if (error) {
    console.error(error.message)
    return undefined
  }
  return value?.[0]
}
