const Bank = artifacts.require("Bank.sol");

contract("Bank", async (accounts) => {
  it("allow a user to deposit funds", async () => {
    const bank = await Bank.new();
    const depositor = accounts[1];

    const amount = web3.utils.toWei("10", "ether");

    await bank.deposit({
      from: depositor,
      value: amount,
    });

    let balance = await bank.balanceOf(depositor);
    balance = parseInt(web3.utils.fromWei(balance, "ether"));

    assert.equal(balance, 10);
  });

  it("allows a user to withdraw funds", async () => {
    const bank = await Bank.new();
    const depositor = accounts[2];

    let bankTotalBalance = await web3.eth.getBalance(bank.address);
    bankTotalBalance = web3.utils.fromWei(bankTotalBalance);
    console.log("BANK BAL:", bankTotalBalance);

    const amount = web3.utils.toWei("20", "ether");

    await bank.deposit({ from: depositor, value: amount });

    let balance = await bank.balanceOf(depositor);
    balance = parseInt(web3.utils.fromWei(balance, "ether"));
    assert.equal(balance, 20);

    bankTotalBalance = await web3.eth.getBalance(bank.address);
    bankTotalBalance = web3.utils.fromWei(bankTotalBalance);
    console.log("BANK BAL:", bankTotalBalance);

    const withdraw_amount = web3.utils.toWei("10", "ether");
    await bank.withdraw(withdraw_amount, { from: depositor });

    balance = await bank.balanceOf(depositor);
    balance = parseInt(web3.utils.fromWei(balance, "ether"));
    assert.equal(balance, 10);

    bankTotalBalance = await web3.eth.getBalance(bank.address);
    bankTotalBalance = web3.utils.fromWei(bankTotalBalance);
    console.log("BANK BAL:", bankTotalBalance);

    assert.equal(parseInt(bankTotalBalance), 10);
  });
});
