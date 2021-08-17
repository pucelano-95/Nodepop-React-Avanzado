import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter as Router } from "connected-react-router";
import App from "./App";

function Root({ store, history }) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
}

export default Root;
