import reducer from "../Store/Reducer";
import { RESULT_SEARCH, SAVE_INPUT_TEXT, HIDDEN_ELEMENT, ALL_COMMITS_GIT, GIT_REPOS_WITH_WATCHERS, EXPANDED, GET_COMMITS_USER } from "../Store/ActionType";
import store from "../Store/Store";
import { red } from "@material-ui/core/colors";

describe("REDUCER>>>> TEST", () => {
    const state = {
        gitReposWithWatchers: [],
        commitsRepo: [],
        inputText: "",
        outputOfUserCommits: [],
        expanded: "",
        resultSearch: [],
        hiddenClass: "hidden-element",
    };
    test("__test__ for getting values ​​in a variable GIT REPOS WITCH WATCHERS", () => {
        // @ts-ignore
        const gitReposWatchersTest = reducer(state.gitReposWithWatchers, {
            type: GIT_REPOS_WITH_WATCHERS,
            payload: { repos: [{}, {}] }
        })
        expect(gitReposWatchersTest).toEqual({
            resultSearch: [],
            inputText: "",
            expanded: "",
            gitReposWithWatchers: [{}, {}]
        })
    })
    test("__test__ for getting values ​​in a variable RESULT SEARCH ", () => {

        // @ts-ignore
        const resultSearchTest = reducer(state.resultSearch, {
            type: RESULT_SEARCH,
            payload: { resultSearch: [{}, {}] },
        });

        expect(resultSearchTest).toEqual({ resultSearch: [{}, {}] });
    });


    describe('test commitsRepo', () => {
        test("__test__ for getting values ​​in a variable COMMITS REPO", () => {
            const commitsRepoTest = reducer(state, {
                type: ALL_COMMITS_GIT,
                payload: { commits: [{}] }
            })

            expect(commitsRepoTest).toEqual({
                commitsRepo: [{}],
                expanded: "",
                gitReposWithWatchers: [],
                hiddenClass: "hidden-element",
                inputText: "",
                outputOfUserCommits: [],
                resultSearch: []
            })
        })

        test('__test__ for getting values ​​in a variable OUTPUT COMMITS USER', () => {
            const outputOfUserCommitsTest = reducer(state, {
                type: GET_COMMITS_USER,
                payload: { login: 'login' }
            })
            expect(outputOfUserCommitsTest).toEqual(state)
        })
    })


    test("input __test__ ", () => {

        // @ts-ignore
        const inputTextTest = reducer(state.inputText, {
            type: SAVE_INPUT_TEXT,
            payload: { text: "ONE" },
        });
        expect(inputTextTest).toEqual({ inputText: "ONE" });
    });


    test('__test__ for getting values ​​in a variable EXPANDED', () => {
        // @ts-ignore
        const expandedTest = reducer(state.expanded, {
            type: EXPANDED,
            payload: {
                expanded: 'login'
            }
        })
        expect(expandedTest).toEqual({ expanded: 'login' })
    })
    test('__test__ for getting values ​​in a variable HIDDEN CLASS ', () => {
        const hiddenClassTest = reducer(state, {
            type: HIDDEN_ELEMENT,
            payload: {
                nameClass: 'any Class'
            }
        })
        expect(hiddenClassTest).toEqual({
            commitsRepo: [],
            expanded: "",
            gitReposWithWatchers: [],
            hiddenClass: 'any Class',
            inputText: "",
            outputOfUserCommits: [],
            resultSearch: [],
        })
    })
});
