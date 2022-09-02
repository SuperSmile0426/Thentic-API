import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import Web3 from "web3";
// import { Web3ReactProvider } from "@web3-react/core";

//routes
import AppRoutes from "./AppRoutes";

// const getLibrary = (provider: any) => {
//   return new Web3(provider);
// }

//stores
import store from "./redux";

function App() {
  return (
    <Provider store={store}>
      {/* <Web3ReactProvider getLibrary={getLibrary}> */}
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      {/* </Web3ReactProvider> */}
    </Provider>
  );
}

export default App;
