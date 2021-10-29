
import configureMockStore from 'redux-mock-store';
import {
    ActionCommitGit,
    ActionGitRepo,
    ActionInputSave,
    ActionSaveResultSearch,
    ActionSetExpanded
} from "../Store/Action";
import {ALL_COMMITS_GIT, EXPANDED, GIT_REPOS_WITH_WATCHERS, RESULT_SEARCH, SAVE_INPUT_TEXT} from "../Store/ActionType";


const mockStore = configureMockStore();

describe('>>>A C T I O N --- Test ', () => {
    it('actionCreator ActionSetExpanded', () => {
        const checkAction = ActionSetExpanded("login");
        expect(checkAction).toEqual({ type: EXPANDED , payload:{expanded: "login" }});
    });

    it(' actionCreator ActionGitRepo', () => {
        const checkAction = ActionGitRepo([{},{}]);
        expect(checkAction).toEqual({ type: GIT_REPOS_WITH_WATCHERS, payload:{ repos: [{},{}] }});
    });
    it('actionCreator ActionSaveResultSearch', ()=>{
        const checkAction = ActionSaveResultSearch(['str','str2'])
        expect(checkAction).toEqual({ type: RESULT_SEARCH, payload:{ resultSearch:['str','str2'] }});
    });
    it('actionCreator ActionCommitGit', ()=>{
        const checkAction = ActionCommitGit([{},{}])
        expect(checkAction).toEqual({ type: ALL_COMMITS_GIT, payload:{ commits: [{},{}] }});
    })
    it('actionCreator ActionCommitGit',()=>{
        const checkAction =ActionInputSave('text')
        expect(checkAction).toEqual({ type: SAVE_INPUT_TEXT, payload:{ text: "text" }});
    })
});

