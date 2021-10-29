const GIT_REPO_WITH_WATCHERS = (state) => state.gitReposWithWatchers;
const GIT_REPO_COMMITS = (state) => state.commitsRepo;
const COMMITS_USER = (state) => state.outputOfUserCommits;
const INPUT_TEXT = (state) => state.inputText;
const CHECK_EXPANDED = (state) => state.expanded;
const RESULT_INPUT_SEARCH = (state) => state.resultSearch;
const HIDDEN_OR_VISIBLE_CLASS = (state) => state.hiddenClass;

export {
  GIT_REPO_WITH_WATCHERS,
  CHECK_EXPANDED,
  GIT_REPO_COMMITS,
  COMMITS_USER,
  INPUT_TEXT,
  RESULT_INPUT_SEARCH,
  HIDDEN_OR_VISIBLE_CLASS,
};
