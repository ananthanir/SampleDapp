const hre = require("hardhat");
const { writeFile } = require("fs");

async function main() {
  const cert = await hre.ethers.deployContract("Cert");

  await cert.waitForDeployment();

  const details = {
    deployer: cert.deploymentTransaction().from,
    contract: await cert.getAddress(),
  };

  console.log(`Deployer ${details.deployer} deployed contrat at ${details.contract}`);

  writeFile(
    "../api/artifacts/details.json",
    JSON.stringify(details, null, 2),
    (err) => {
      if (err) {
        return console.log(err);
      }
      return console.log("Details are saved!!");
    }
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});