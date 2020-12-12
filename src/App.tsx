import {hot} from "react-hot-loader/root";
import "./App.scss";
import React from "react";
import GridLayout from "./layouts/demos/GridLayout";
import FlexboxLayout from "./layouts/demos/FlexboxLayout";

interface IProps {
    title?: string,
}

const App: React.FunctionComponent<IProps> = () => {
    const flexboxLayout = false;

    return (
        flexboxLayout?<FlexboxLayout title={"Demo Flexbox Layout"} />:<GridLayout title={"Demo Grid Layout"} />
    );
}

export default hot(App);
