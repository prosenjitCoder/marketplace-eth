import { useAccount } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Loader } from "@components/ui/common";
import Link from "next/link";

const lectures = [
  "How to init App",
  "How to get a help",
  "Introduction to Solidity",
  "Programing in C++",
  "How to write For Loops",
  "Safe operator",
];

const accessStatus =
  "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";

const Curriculum = ({ locked, courseState }) => {
  const { connect, isLoading } = useWeb3();
  const { account } = useAccount();
  return (
    <section className="max-w-5xl mx-auto">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Section 1
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lectures.map((lec) => (
                    <tr key={lec}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {lec}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={
                            locked
                              ? `bg-red-100 text-red-800 ${accessStatus}`
                              : `bg-green-100 text-green-800 ${accessStatus}`
                          }
                        >
                          {locked ? "Locked" : "Unlocked"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {isLoading ? (
                          <Loader />
                        ) : locked ? (
                          <>
                            {courseState === "deactivated" && (
                              <Link href="/marketplace">
                                <a className="text-red-600 hover:text-red-900">
                                  Get access
                                </a>
                              </Link>
                            )}
                            {courseState === "purchased" && (
                              <Link href="/faq">
                                <a className="text-yellow-600 hover:text-yellow-900">
                                  Waiting for activation...
                                </a>
                              </Link>
                            )}
                            {courseState === undefined && !account.data && (
                              <span
                                onClick={connect()}
                                className="text-indigo-500 hover:text-indigo-900 text-base cursor-pointer"
                              >
                                Connect
                              </span>
                            )}
                          </>
                        ) : (
                          <Link href="/watch">
                            <a className="text-green-600 hover:text-green-900">
                              Watch now
                            </a>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Curriculum;
