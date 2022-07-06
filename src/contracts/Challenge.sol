// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import './ChallengeUSDT.sol';

/**
 * @title Challenge
 * @dev DeversiFi Code challenge
 */
contract Challenge {
    // Address - reference to the USDT test token contract
    ChallengeUSDT public tokenContract;
    // Price - 1 ETH = 100 USDT
    uint256 public tokenPrice = 100;

    // Buy/sell event - emitted on every buy/sell call
    event Swap(address indexed user, string inputToken, string outputToken, uint256 amount);

    // Intializes the smart contract with the test token
    constructor(ChallengeUSDT _tokenContract) {
        tokenContract = _tokenContract;
    }

    // This method spends native tokens (ETH) - as such it needs value sent with the transaction
    function buy() payable public {
        uint256 amount = msg.value * tokenPrice;
        require(msg.value > 0, 'ETH amount is 0');
        tokenContract.freeMint(amount);
        emit Swap(msg.sender, 'ETH', 'USDT', amount);
    }

    // This method spends ERC20 tokens - as such the token contract needs to approve the 
    // challenge contract to spend funds first (check out the ERC20 approve method)
    function sell(uint256 amount) public {
        require(amount > 0, "You need to sell at least some tokens");
        uint256 allowance = tokenContract.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        tokenContract.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Swap(msg.sender, 'USDT', 'ETH', amount);
    }
}
