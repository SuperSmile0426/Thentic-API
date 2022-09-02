import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// moralis
// import { MoralisProvider } from 'react-moralis'

//routes
import AppRoutes from "./AppRoutes";

//const 
// import { web3Moralis } from "./consts";

//stores
import {store} from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      {/* <MoralisProvider
        appId={web3Moralis.PUBLIC_MORALIS_APP_ID as string}
        serverUrl={web3Moralis.PUBLIC_MORALIS_SERVER_ID as string}
      > */}
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      {/* </MoralisProvider> */}
    </Provider>
  );
}

export default App;
