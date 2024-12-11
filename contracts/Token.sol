// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token{
    string public name;
    string public symbol;
    uint public decimals = 18;
    uint public totalSupply;

    mapping(address => uint256) public balanceOf;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply
    ) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply * (10**decimals);
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) 
        public
        returns (bool success) 
    {
        // deduct tokens from spender
        balanceOf[msg.sender] = balanceOf[msg.sender] - _value;
        // credit tokens to receiver
        balanceOf[_to] = balanceOf[_to] + _value;
    }
}
