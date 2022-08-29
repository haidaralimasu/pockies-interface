import { pockiesContract } from "../utils";
import { useCall } from "@usedapp/core";

export const useTotalSupply = () => {
  const { value, error } =
    useCall({
      contract: pockiesContract,
      method: "totalSupply",
      args: [],
    }) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};

export const useMaxSupply = () => {
  const { value, error } =
    useCall({
      contract: pockiesContract,
      method: "getMaxPockies",
      args: [],
    }) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};

export const useMaxPockiesPerTx = () => {
  const { value, error } =
    useCall({
      contract: pockiesContract,
      method: "getMaxPockiesPerTx",
      args: [],
    }) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};

export const useMaxPockiesPerWallet = () => {
  const { value, error } =
    useCall({
      contract: pockiesContract,
      method: "getMaxPockiePerWallet",
      args: [],
    }) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};

export const usePrice = () => {
  const { value, error } =
    useCall({
      contract: pockiesContract,
      method: "getPricePerPockie",
      args: [],
    }) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};

export const useTotalMinted = (user) => {
  const { value, error } =
    useCall({
      contract: pockiesContract,
      method: "getTotalPockiesMinted",
      args: [user],
    }) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};

export const usePresale = () => {
  const { value, error } =
    useCall({
      contract: pockiesContract,
      method: "getIsPresale",
      args: [],
    }) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};
