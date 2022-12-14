const {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} = require("react");
import detectEthereumProvider from "@metamask/detect-provider";
import loadContract from "@utils/loadContract";
import Web3 from "web3";
import { setupHooks } from "./hooks/setupHooks";

const Web3Context = createContext(null);

const createWeb3State = ({ web3, provider, contract, isLoading }) => {
  return {
    web3,
    provider,
    contract,
    isLoading,
    hooks: setupHooks({ web3, provider, contract }),
  };
};

export default function Web3Provider({ children }) {
  const [web3Api, setWeb3Api] = useState(
    createWeb3State({
      web3: null,
      provider: null,
      contract: null,
      isLoading: true,
    })
  );

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider);
        const contract = await loadContract("CourseMarketplace", web3);
        setWeb3Api(
          createWeb3State({ web3, provider, contract, isLoading: false })
        );
      } else {
        setWeb3Api((api) => ({ ...api, isLoading: false }));
        console.error("Please, install metamask.");
      }
    };

    loadProvider();
  }, []);

  const _web3Api = useMemo(() => {
    const { web3, isLoading } = web3Api;
    return {
      ...web3Api,
      requireInstall: !isLoading && !web3,
      connect: () => connectWallet,
    };
  }, [web3Api]);

  const connectWallet = async () => {
    const { provider } = web3Api;
    if (provider) {
      try {
        await provider.request({ method: "eth_requestAccounts" });
      } catch {
        location.reload();
      }
    } else {
      console.error("Can not connect to metamask, please reload your browser.");
    }
  };

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}

export const useHooks = (cb) => {
  const { hooks } = useWeb3();
  return cb(hooks);
};
