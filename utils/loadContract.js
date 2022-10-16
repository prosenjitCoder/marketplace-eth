const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

const loadContract = async (name, web3) => {
  const res = await fetch(`/contracts/${name}.json`);
  const Artifact = await res.json();
  let contract = null;

  try {
    contract = new web3.eth.Contract(
      Artifact.abi,
      Artifact.networks[NETWORK_ID].address
    );
  } catch {
    console.error(`Contract ${name} can not be loaded.`);
  }

  return contract;
};

export default loadContract;
