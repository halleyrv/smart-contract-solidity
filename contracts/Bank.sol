// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Bank {

  mapping (address => uint256) private _balances;
  
  function deposit() payable public {
    _balances[msg.sender] += msg.value;
  }

  function withdraw(uint256 amount) public {
    require(balanceOf(msg.sender) >= amount);
    _balances[msg.sender] -= amount;

    payable(msg.sender).transfer(amount);
  }

  function balanceOf(address account) public view returns (uint256) {
    return _balances[account];
  }
}
