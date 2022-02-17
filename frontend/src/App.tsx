import React, { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import Greeter from "./hardhat/deployments/rinkeby/Greeter.json";
declare var window: any;

function App() {
  const [greetingDisplay, setGreetingDisplay] = useState("");
  useEffect(() => {
    (async function firstGreeting() {
      await getGreeting();
    })();
  });
  async function getGreeting() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(Greeter.address, Greeter.abi, provider);
    try {
      const greeting = await contract.greet();
      setGreetingDisplay(greeting);
    } catch (err) {
      window.alert("Connection to metamask is unavailable!");
    }
  }
  async function setGreeting() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(Greeter.address, Greeter.abi, signer);
    try {
      const tx = await contract.setGreeting("Ola mundo!");
      await tx.wait();
      const greeting = await contract.greet();
      setGreetingDisplay(greeting);
    } catch (err) {
      window.alert("Unable to change the greeting. Verify yout Metamask connection.");
    }
  }
  return (
    <div className="App">
      <button
        onClick={async () => {
          setGreeting();
        }}
      >
        Change Greeting
      </button>
      <p>{greetingDisplay}</p>
    </div>
  );
}

export default App;
