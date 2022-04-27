import { ethers } from "ethers";
import Bridge from "../abis/rinkebyABI.json";
import { RinkebyAddress, MumbaiAddress, BSCAddress } from "./adrese";

const choose = async (provider) => {
	const { chainId } = await provider.getNetwork();
	let address;
  	if (chainId == 4) address = RinkebyAddress;
  	else if (chainId == 97) address = BSCAddress;
  	else if (chainId == 80001) address = MumbaiAddress;
	
	const contract = new ethers.Contract(
		address,
		Bridge.abi,
		provider.getSigner()
	);
	return contract;
}

export default choose