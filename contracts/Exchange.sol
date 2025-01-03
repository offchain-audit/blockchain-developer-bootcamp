//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Token.sol";


contract Exchange {
    address public feeAccount;
    uint256 public feePercent;
    mapping(address => mapping(address => uint256)) public tokens;
    mapping(uint256 => _Order ) public orders;
    uint256 public orderCount;

    event Deposit(
        address token, 
        address user, 
        uint256 amount, 
        uint256 balance
        );

    event Withdraw(
        address token,
        address user,
        uint256 amount,
        uint256 balance
    );
    event Order(
        uint256 id,
        address user,
        address tokenGet,
        uint256 amountGet,
        address tokenGive,
        uint256 amountGive,
        uint256 timestamp
    );

    struct _Order {
        // Order Attributes
        uint256 id;
        address user;
        address tokenGet;
        uint256 amountGet;
        address tokenGive;
        uint256 amountGive;
        uint256 timestamp;
    }

    constructor(address _feeAccount, uint256 _feePercent) {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }
    
    // -----------------------
    // Deposit & Withdraw Tokens

    function depositToken(address _token, uint256 _amount) public {
        // transfer amount from user to exchange
        require(Token(_token).transferFrom(msg.sender, address(this), _amount));
        // update internal mapping of user's token balance in exchange
        tokens[_token][msg.sender] = tokens[_token][msg.sender] + _amount;
        // emit event
        emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
        
    }

    function withdrawToken(address _token, uint256 _amount) public {

        require(tokens[_token][msg.sender] >= _amount);

        tokens[_token][msg.sender] = tokens[_token][msg.sender] - _amount;

        Token(_token).transfer(msg.sender, _amount);  

        emit Withdraw(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }

    function balanceOf(address _token, address _user)
        public
        view
        returns (uint256)
    {
        return tokens[_token][_user];
    }

    // -----------------------------
    // MAKE & CANCEL ORDERS

    // Token Give (user spend token)
    // Token Get (user wants token)
    function makeOrder(
        address _tokenGet,
        uint256 _amountGet,
        address _tokenGive,
        uint256 _amountGive
        ) 
        public {

            // PRE-ORDER TOKEN BALANCE CHECK
            require(balanceOf(_tokenGive, msg.sender) >= _amountGive);

            // INSTANTIATE NEW ORDER
            orderCount = orderCount + 1;
            orders[orderCount] = _Order(
                orderCount,
                msg.sender,
                _tokenGet,
                _amountGet,
                _tokenGive,
                _amountGive,
                block.timestamp
            );

            // EMIT EVENT
            emit Order(
                orderCount,
                msg.sender,
                _tokenGet,
                _amountGet,
                _tokenGive,
                _amountGive,
                block.timestamp
            );
    }
}