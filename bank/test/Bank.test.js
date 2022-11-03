const Bank = artifacts.require('Bank.sol')


//test for depositing money in the bank
//async because use of await for waiting the creation of the bank before going on with test
contract("Bank", async (accounts) => {
	
	it("allows a user to deposit funds", async () => {
	
	const bank = await Bank.new()
	const depositor = accounts[1]
	
	//convert eths to base unit
	const amount = web3.utils.toWei('10','ether')
	
	await bank.deposit(amount, {
		from: depositor,
		value:amount
		
		})
	
	let balance = await bank.balanceOf(depositor)
	//convert from base unit to eths
	balance = parseInt(web3.utils.fromWei(balance, 'ether'))
	 
	assert.equal(balance,10)
	})
	
	it("allows a user to withdraw funds", async () => {
	
	const bank = await Bank.new()
	const depositor = accounts[2]
	
	let bankTotalBalance = await web3.eth.getBalance(bank.address)
	bankTotalBalance = web3.utils.fromWei(bankTotalBalance)
	console.log("BANK BAL: ", bankTotalBalance)
	
	
	//convert eths to base unit
	const amount = web3.utils.toWei('20','ether')

	
	await bank.deposit(amount, {
		from: depositor,
		value:amount
		
		})
	bankTotalBalance = await web3.eth.getBalance(bank.address)
	bankTotalBalance = web3.utils.fromWei(bankTotalBalance)
	console.log("BANK BAL: ", bankTotalBalance)
	
	let balance = await bank.balanceOf(depositor)
	//convert from base unit to eths
	balance = parseInt(web3.utils.fromWei(balance, 'ether'))
	 
	assert.equal(balance,20)
	
	
	const withdraw_amount = web3.utils.toWei('10', 'ether')
	await bank.withdraw(withdraw_amount, {from: depositor})
	
	bankTotalBalance = await web3.eth.getBalance(bank.address)
	bankTotalBalance = web3.utils.fromWei(bankTotalBalance)
	console.log("BANK BAL: ", bankTotalBalance)
	
	balance = await bank.balanceOf(depositor)
	balance = parseInt(web3.utils.fromWei(balance,'ether'))
	assert.equal(balance,10)
	
	assert.equal(parseInt(bankTotalBalance),10)
	
	})

})