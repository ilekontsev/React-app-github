import InputSearch from "../components/InputSearch/InputSearch";
import { create } from "react-test-renderer";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore([]);

describe(">>>InputSearch --- Snapshot", () => {
  const store = mockStore({
    gitReposWithWatchers: [{}],
    commitsRepo: [],
    inputText: "",
    outputOfUserCommits: [],
    expanded: "",
    resultSearch: [],
    hiddenClass: "hidden-element",
  });
  let wrap = create(
    <Provider store={store}>
      <InputSearch />
    </Provider>
  );
  test(" Snapshot of InputSearch", () => {
    expect(wrap).toMatchSnapshot();
  });
});
