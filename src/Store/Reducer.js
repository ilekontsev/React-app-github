import {
  ALL_COMMITS_GIT,
  DELETE_COMMITS_USER,
  EXPANDED,
  GET_COMMITS_USER,
  GIT_REPOS_WITH_WATCHERS,
  HIDDEN_ELEMENT,
  RESULT_SEARCH,
  SAVE_INPUT_TEXT,
} from "./ActionType";

const initialState = {
  gitReposWithWatchers: [],
  commitsRepo: [],
  inputText: "",
  outputOfUserCommits: [],
  expanded: "",
  resultSearch: [],
  hiddenClass: "hidden-element",
};

export const gitToken = "";

function reducer(state = initialState, action) {
  switch (action.type) {
    case GIT_REPOS_WITH_WATCHERS:
      return {
        ...state,
        resultSearch: [],
        inputText: "",
        expanded: "",
        gitReposWithWatchers: action.payload.repos,
      };

    case RESULT_SEARCH:
      return {
        ...state,
        resultSearch: action.payload.resultSearch,
      };

    case HIDDEN_ELEMENT:
      return {
        ...state,
        hiddenClass: action.payload.nameClass,
      };

    case DELETE_COMMITS_USER:
      return {
        ...state,
        commitsRepo: state.commitsRepo.filter((item) => {
          if (item.userName !== action.payload.login) {
            return item;
          }
          return 0;
        }),
      };

    case EXPANDED:
      return {
        ...state,
        expanded: action.payload.expanded,
      };

    case ALL_COMMITS_GIT:
      return {
        ...state,
        commitsRepo: state.commitsRepo.concat(action.payload.commits),
      };

    case GET_COMMITS_USER:
      return {
        ...state,
        outputOfUserCommits: state.commitsRepo.filter((item) => {
          if (item.userName === action.payload.login) {
            return item;
          }
          return 0;
        }),
      };

    case SAVE_INPUT_TEXT:
      return {
        ...state,
        inputText: action.payload.text,
      };

    default:
      return state;
  }
}

export default reducer;
