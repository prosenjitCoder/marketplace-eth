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
      return accounts[0];
    }
  );

  useEffect(() => {
    provider &&
      provider.on("accountsChanged", (accounts) => mutate(accounts[0] ?? null));
  }, [provider]);

  return {
    data,
    isAdmin: (data && adminAddresses[data]) ?? false,
    mutate,
    ...rest,
  };
};
