const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(),"ether")
}
describe("Token", ()=> {
    let token, accounts, deployer, receiver

    beforeEach(async () => {
        const Token = await ethers.getContractFactory("Token")
        token = await Token.deploy("Socrates", "SOCR", "1000000")

        accounts = await ethers.getSigners()
        deployer = accounts[0]
        receiver = accounts[1]
    })

    describe("Deployment", () => {
        const name = "Socrates"
        const symbol = "SOCR"
        const decimals = "18"
        const totalSupply = "1000000"

        it("Has correct name.", async ()=> {
            expect(await token.name()).to.equal(name)
        })
    
        it("Has correct symbol.", async ()=> {
            expect(await token.symbol()).to.equal(symbol)
        })
    
        it("Has correct decimals.", async ()=> {
            expect(await token.decimals()).to.equal(decimals)
        })
    
        it("Has correct total supply.", async ()=> {
            expect(await token.totalSupply()).to.equal(tokens(totalSupply))
        })

        it("Assigns total supply to deployer.", async ()=> {
            expect(await token.balanceOf(deployer.address)).to.equal(tokens(totalSupply))
        })
    })
    
    
    describe("Sending Tokens", () => {
        let amount, transaction, result

        beforeEach(async () => {
            amount = tokens(100)
            transaction = await token.connect(deployer).transfer(receiver.address, amount)
            result = transaction.wait()
        })

        it("Transfers token balances.", async () => {
            // console.log("Deployer balance before transfer:", await token.balanceOf(deployer.address))
            // console.log("Receiver balance before transfer:", await token.balanceOf(receiver.address))
            //ensure tokens were transfered (balance change)
            expect(await token.balanceOf(deployer.address)).to.equal(tokens(999900))
            expect(await token.balanceOf(receiver.address)).to.equal(amount)
            // console.log("Deployer balance after transfer:", await token.balanceOf(deployer.address))
            // console.log("Receiver balance after transfer:", await token.balanceOf(receiver.address))          

        })
    })
})
