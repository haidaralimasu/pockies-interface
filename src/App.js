import React, { useEffect } from "react";
import { InfoSection, Navbar, Footer } from "./components";
import { supportedChainId } from "./config";
import { useEthers } from "@usedapp/core";

const App = () => {
  const { chainId, switchNetwork } = useEthers();

  useEffect(() => {
    if (chainId !== supportedChainId) {
      switchNetwork(supportedChainId);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <InfoSection />
      <Footer />
    </div>
  );
};

export default App;
