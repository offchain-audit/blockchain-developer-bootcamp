const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", ()=> {
    it("has a name", async ()=> {
        const Token = await ethers.getContractFactory("Token")
        let token = await Token.deploy()
        const name = await token.name()
        expect(name).to.equal("My Token")
    })
})

