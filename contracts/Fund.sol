// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './PriceConverter.sol';

contract FundMe {
    using PriceConverter for uint256;

    uint256 public minimumUsd = 50 * 1e18;
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function fund() public payable {
        // Want to be able to set a minimum fund amount in USD
        // require(getConversionRate(msg.value) >= minimumUsd, "Didnt send enough money"); // 1e18 == 1 * 10 ** 18 == 100000000000000000 = 1 eth
        require(
            msg.value.getConversionRate() >= minimumUsd,
            'Didnt send enough money'
        );
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }

    // for loop

    function withdraw() public onlyOwner {
        require(msg.sender == owner, 'You are not the owner!');
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }

        // reset array
        funders = new address[](0);

        // withdraw funds
        // transfer -> if succsesful send or returns error
        // payable(msg.sender).transfer(address(this).balance);
        // send -> if succesful send or returns bool
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send failed");
        // call -> forward all gas and set gas and returns bool
        (bool callSuccess /*bytes memory dataReturned*/, ) = payable(msg.sender)
            .call{value: address(this).balance}('');
        require(callSuccess, 'Call failed');
    }

    // modifier
    modifier onlyOwner() {
        require(msg.sender == owner, 'You are not the owner!');
        _; // means do the rest of the code
    }
    // Reverting - undo any action before, and send remaining gas back
}
