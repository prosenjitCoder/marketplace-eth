import { useAdmin, useManagedCourses } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button, Message } from "@components/ui/common";
import { CourseFilter, ManagedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { useState } from "react";

const VerificationInput = ({ onVerify }) => {
  const [email, setEmail] = useState("");
  const [emptyInput, setEmptyInput] = useState(false);

  return (
    <>
      <div className="flex mr-2 relative rounded-md">
        <input
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
          type="text"
          name="account"
          id="account"
          className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
          placeholder="0x2341ab..."
        />
        <Button
          onClick={() => {
            if (email) {
              onVerify(email);
              setEmptyInput(false);
            } else {
              setEmptyInput(true);
            }
          }}
        >
          Verify
        </Button>
      </div>
      <div className="mt-2">
        {emptyInput && (
          <Message type="danger">Input must not be empty!</Message>
        )}
      </div>
    </>
  );
};

const ManagedCourses = () => {
  const [proofedOwnership, setProofedOwnership] = useState({});
  const { web3 } = useWeb3();
  const { account } = useAdmin({ redirectTo: "/marketplace" });
  const { managedCourses } = useManagedCourses(account);

  const verifyCourse = (email, { hash, proof }) => {
    const emailHash = web3.utils.sha3(email);
    const proofToCheck = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: hash }
    );

    proofToCheck === proof
      ? setProofedOwnership({
          ...proofedOwnership,
          [hash]: true,
        })
      : setProofedOwnership({
          ...proofedOwnership,
          [hash]: false,
        });
  };

  if (!account.isAdmin) {
    return null;
  }

  return (
    <BaseLayout>
      <MarketHeader />
      <CourseFilter />
      <section className="grid grid-cols-1">
        {managedCourses.data?.map((course) => (
          <ManagedCourseCard key={course.ownedCourseId} course={course}>
            <VerificationInput
              onVerify={(email) => {
                email
                  ? verifyCourse(email, {
                      hash: course.hash,
                      proof: course.proof,
                    })
                  : setEmptyInput(true);
              }}
            />
            <div className="mt-2">
              {proofedOwnership[course.hash] && <Message>Verified</Message>}
              {proofedOwnership[course.hash] === false && (
                <Message type="danger">Wrong proof!</Message>
              )}
            </div>
          </ManagedCourseCard>
        ))}
      </section>
    </BaseLayout>
  );
};

export default ManagedCourses;
