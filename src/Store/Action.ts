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

function ActionSetExpanded(expanded: string) {
  return {
    type: EXPANDED,
    payload: {
      expanded,
    },
  };
}

function ActionGitRepo(repos: object[]) {
  return {
    type: GIT_REPOS_WITH_WATCHERS,
    payload: {
      repos,
    },
  };
}

function ActionSaveResultSearch(resultSearch: string[]) {
  return {
    type: RESULT_SEARCH,
    payload: {
      resultSearch,
    },
  };
}

function ActionHiddenFocus(nameClass: string) {
  return {
    type: HIDDEN_ELEMENT,
    payload: {
      nameClass,
    },
  };
}

function ActionCommitGit(commits: object[]) {
  return {
    type: ALL_COMMITS_GIT,
    payload: {
      commits,
    },
  };
}

function ActionOutputCommitsRepoUser(login: string) {
  return {
    type: GET_COMMITS_USER,
    payload: {
      login,
    },
  };
}

function ActionDeleteUserCommits(login: string) {
  return {
    type: DELETE_COMMITS_USER,
    payload: {
      login,
    },
  };
}

function ActionInputSave(text: string) {
  return {
    type: SAVE_INPUT_TEXT,
    payload: {
      text,
    },
  };
}

export {
  ActionSetExpanded,
  ActionCommitGit,
  ActionGitRepo,
  ActionOutputCommitsRepoUser,
  ActionInputSave,
  ActionDeleteUserCommits,
  ActionHiddenFocus,
  ActionSaveResultSearch,
};
