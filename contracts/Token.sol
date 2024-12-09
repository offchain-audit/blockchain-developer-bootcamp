// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token{
    string public name = "Socrates";
    string public symbol = "SOCR";
    uint public decimals = 18;
    uint public totalSupply = 1000000 * (10**decimals);

}
