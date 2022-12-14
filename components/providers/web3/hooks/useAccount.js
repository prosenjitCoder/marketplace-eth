import { useEffect } from "react";
import useSWR from "swr";

const adminAddresses = {
  "0xF53648c41778127554b90ab95Ecd99D7c38109d1": true,
};

export const handler = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    web3 ? "web3/account" : null,
    async () => {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      if (!account) {
        throw new Error("Can not retrive account. Please refresh browser.");
      }
      return account;
    }
  );

  useEffect(() => {
    const mutator = (accounts) => mutate(accounts[0] ?? null);
    provider?.on("accountsChanged", mutator);
    return () => {
      provider?.removeListener("accountsChanged", mutator);
    };
  }, [provider]);

  return {
    data,
    isAdmin: (data && adminAddresses[data]) ?? false,
    mutate,
    ...rest,
  };
};
