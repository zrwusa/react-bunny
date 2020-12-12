import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import {Provider} from "react-redux";
import store from "./stores";

const rootElement = document.getElementById("root")

ReactDOM.render(
    <Provider store={store}>
        <App title={"I am App title"}/>
    </Provider>,
    rootElement
);

