import React, { PureComponent } from "react";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/ConfigureStore";
import "./App.scss";

const store: any = ConfigureStore();

export default class App extends PureComponent {
    render() {
        return (
            <Provider store={store}>
                <div className="App"></div>
            </Provider>
        );
    }
}
