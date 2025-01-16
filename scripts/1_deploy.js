async function main() {
    console.log(`Preparing for deployment...\n`)
    // fetch contract to deploy
    const Token = await ethers.getContractFactory("Token")
    const Exchange = await ethers.getContractFactory("Exchange")

    const accounts = await ethers.getSigners()
    console.log(`Accounts fetched:\n${accounts[0].address}\n${accounts[0].address}\n`)

    // deploy contracts
    const dapp = await Token.deploy("Dapp University", "DAPP", "1000000")
    await dapp.deployed()
    console.log(`Dapp Token deployed to: ${dapp.address}`)

    const mETH = await Token.deploy("mETH", "mETH", "1000000")
    await mETH.deployed()
    console.log(`mETH Token deployed to: ${mETH.address}`)

    const mDAI = await Token.deploy("mDAI", "mDAI", "1000000")
    await dapp.deployed()
    console.log(`mDAI Token deployed to: ${mDAI.address}`)

    const exchange = await Exchange.deploy(accounts[1].address, 10)
    await exchange.deployed()
    console.log(`Exchange deployed tp: ${exchange.address}`)
  }

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
