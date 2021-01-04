/*
const UniswapV2FactoryBytecode = require('@uniswap/v2-core/build/UniswapV2Factory.json').bytecode;
const UniswapV2FactoryABI = require('@uniswap/v2-core/build/UniswapV2Factory.json').abi;
const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx');
const web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/e692e48e183f4772a500fe1ab8d47f03'));
const privateKey = "6c669dfbdb7656b24779a2c558f71e894a5a41667a3f49731fe54dfa12af99fe"
module.exports = async function (deployer, network, addresses) {

	// pls go to metamask then paste address here
    await deployFactory("0xa89EA08B04441881871e8c6b526227311f07cB12", privateKey)
};

const deployFactory = async (address, privateKey) => {
    const contract = new web3.eth.Contract(UniswapV2FactoryABI);
    const contractData = contract.deploy({
        data: UniswapV2FactoryBytecode,
        arguments: [address]
    }).encodeABI();
    await createTrans(address, contractData, privateKey);
}

const createTrans = async (address, data, privateKey) => {
    const nonce = await web3.eth.getTransactionCount(address);
    const rawTx = {
        from: address,
        nonce: nonce,
        gasPrice: web3.utils.toHex(web3.utils.toWei('50', 'gwei')),
        gasLimit: 8000000,
        data: data
    }
    await web3SendSignedTransaction(privateKey, rawTx)
}

const web3SendSignedTransaction = async (privateKey, rawTx) => {
    const tx = new EthereumTx(rawTx);
    const signKey = Buffer.from(privateKey, 'hex');
    console.log(signKey)
    tx.sign(signKey);
    const serializedTx = tx.serialize();
    await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .on('receipt', console.log);
}
*/
const Factory = artifacts.require ("AfricaswapFactory.sol");
// const Pair = artifacts.require("AfricaswapPair.sol");
const Token1 = artifacts.require("Token1.sol");
const Token2 = artifacts.require("Token2.sol");

module.exports = async function (deployer, network, adresses) {
	await deployer.deploy(Factory, adresses[0]);
	const factory = await Factory.deployed();

	let token1Address, token2Address;
	if(network === 'mainnet') {
		token1Address = '';
		token2Address = '';
	} else {
	await deployer.deploy(Token1);
  	await deployer.deploy(Token2);
  	const token1 = await Token1.deployed();
  	const token2 = await Token2.deployed();
  	token1Adress = token1.address;
  	token2Adress = token2.address;

	await factory.createPair(token1.address, token2.address);
	}

	const getHash = await factory.pairCodeHash();
	console.log(getHash);
	// await deployer.deploy(Pair);
	// const pair = await Pair.deployed();
	};


	//await deployer.deploy(Pair);
	//const pair = await Pair.deployed();


	// pls comment all 