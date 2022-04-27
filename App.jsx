import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import retele from "./components/retele";
import choose from "./components/chooseid";
  
//weird-flag
//nu pot folosi if...else in react ca in mod uzual
//idk why =(((((
function App() {
  
  // usetstate for storing and retrieving wallet details
  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });
  
  const btnhandler = () => {
  
    if (window.ethereum) {
  
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  };
  
  const getbalance = (address) => {
  
    // Requesting balance method
    window.ethereum
      .request({ 
        method: "eth_getBalance", 
        params: [address, "latest"] 
      })
      .then((balance) => {
        // Setting balance
        setdata({
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };
  
  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    setdata({
      address: account,
    });
  
    getbalance(account);
  };
  
  const buySubscription = async (nume_retea) => {
	retele(nume_retea);
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const contract = await choose(provider);
	try {
		await contract.buySubscription({
			value: ethers.utils.parseEther("0.1"),
		});
	} catch (err) {
		console.log("Error: ", err);
	}
  };

  const claim = async (nume_retea) => {
	retele(nume_retea);
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const contract = await choose(provider);
	try {
		const adresa = await provider.getSigner().getAddress();
	} catch (err) {
		console.log("Error: ", err);
	}
  };

  return (
    <div className="App">
      {/* Calling all values which we 
       have stored in usestate */}
  
      <Card className="text-center">
        <Card.Header>
          <strong>Address: </strong>
          {data.address}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Balance: </strong>
            {data.Balance}
          </Card.Text>
          <Button onClick={btnhandler} variant="primary">
            Connect to wallet
          </Button>
        </Card.Body>
	   	<Card.Body>
	   		<button onClick={() => buySubscription("rinkeby")}>Rinkeby Subscription </button>
			<button onClick={() => buySubscription("bsc")}>Rinkeby Subscription </button>
			<button onClick={() => buySubscription("mumbai")}>Rinkeby Subscription </button>
		</Card.Body>
		<Card.Body>
			<button onClick={() => claim("rinkeby")}> Claim ETH </button>
			<button onClick={() => claim("bsc")}> Claim BNB </button>
			<button onClick={() => claim("mumbai")}> Claim MATIC </button>
		</Card.Body>
      </Card>
    </div>
  );
}
  
export default App;