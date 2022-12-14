import { useWalletInfo } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button } from "@components/ui/common";

const WalletBar = () => {
  const { requireInstall } = useWeb3();
  const { account, network } = useWalletInfo();
  return (
    <section className="text-white bg-indigo-600 rounded-lg">
      <div className="p-8">
        <h1 className="text-base xs:text-xl break-words">
          Hello, {account.data}
        </h1>
        <h2 className="subtitle mb-5 text-sm xs:text-base">
          I hope you are having a great day!
        </h2>
        <div className="flex justify-between items-center">
          <div className="sm:flex sm:justify-center lg:justify-start">
            <Button className="text-sm xs:text-lg mr-2 p-2" variant="white">
              Learn how to purchase
            </Button>
          </div>
          <div>
            {network.hasInitialResponse && !network.isSupported && (
              <div className="bg-red-100 text-red-900 p-3 rounded">
                <div>Connected to wrong network</div>
                <div>
                  Connect to:{" "}
                  <strong className="text-2xl">{network.target}</strong>
                </div>
              </div>
            )}
            {requireInstall && (
              <div className="bg-yellow-100 text-yellow-900 font-medium p-4 rounded-lg">
                Can not connect to network. Please install Metamask.
              </div>
            )}

            {network.data && (
              <div>
                <span>Currently on </span>
                <strong className="text-2xl">{network.data}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WalletBar;
