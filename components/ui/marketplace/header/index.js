import { useAccount } from "@components/hooks/web3";
import { Breadcrumbs } from "@components/ui/common";
import { EthRates, WalletBar } from "@components/ui/web3";

const LINKS = [
  {
    href: "/marketplace",
    value: "Buy",
  },
  {
    href: "/marketplace/courses/owned",
    value: "My Courses",
  },
  {
    href: "/marketplace/courses/managed",
    value: "Manage Courses",
    requireAdmin: true,
  },
];

const Header = () => {
  const { account } = useAccount();
  return (
    <>
      <div className="pt-4">
        <WalletBar />
      </div>
      <EthRates />
      <div className="p-4 sm:px-6 lg:px-8 flex flex-row-reverse">
        <Breadcrumbs isAdmin={account.isAdmin} items={LINKS} />
      </div>
    </>
  );
};

export default Header;
