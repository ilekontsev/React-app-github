import React from "react";
import App from "../App";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

const mockStore = configureStore();
const initialState = {
  gitReposWithWatchers: [],
  commitsRepo: [],
  inputText: "",
  outputOfUserCommits: [],
  expanded: "",
  resultSearch: [],
  hiddenClass: "hidden-element",
};
const store = mockStore(initialState);
configure({ adapter: new Adapter() });

describe(">>>APP --- Snapshot", () => {
  test(" Snapshot of App", () => {
    const wrap = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    console.log("wdadwa", wrap);
    expect(wrap.find(".root-wrap")).toHaveLength(0);
  });
});
