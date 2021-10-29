// import "./App.css";
import axios from "axios";
import { ChangeEvent, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import { useSelector } from "react-redux";
import {
  CHECK_EXPANDED,
  GIT_REPO_COMMITS,
  GIT_REPO_WITH_WATCHERS,
} from "./Store/Selector";
import store from "./Store/Store";
import {
  ActionSetExpanded,
  ActionOutputCommitsRepoUser,
  ActionHiddenFocus,
} from "./Store/Action";
import { gitToken } from "./Store/Reducer";
import { Commits } from "./components/Commit/Commit";
import InputSearch from "./components/InputSearch/InputSearch";
import { Repository } from "./components/Repositoriy/Repositoriy";
import {
  getCommitsWithGit,
  repeatedReqReposWithWatchers,
} from "./Store/Effect";
import { DescCommitsRepos, DescReposWatchers } from "./App.Interface";

const App = () => {
  const DB_CommitsRepos: DescCommitsRepos[] = useSelector(GIT_REPO_COMMITS);
  const ReposWithWatchers: DescReposWatchers[] = useSelector(
    GIT_REPO_WITH_WATCHERS
  );
  const expandedLogin = useSelector(CHECK_EXPANDED);

  useEffect(() => {
    axios
      .get(
        "https://api.github.com/search/repositories?q=stars%3A%3E0&sort=stars&per_page=15",
        {
          headers: {
            Authorization: `token ${gitToken}`,
          },
        }
      )
      .then((res) => {
        store.dispatch(repeatedReqReposWithWatchers(res.data.items));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const funcCommits = async (login: string, nameRepo: string) => {
    const checkThereIs = DB_CommitsRepos.some(
      (item) => item.userName === login
    );

    if (checkThereIs) {
      store.dispatch(ActionOutputCommitsRepoUser(login));
    } else {
      await store.dispatch(getCommitsWithGit(login, nameRepo));
      store.dispatch(ActionOutputCommitsRepoUser(login));
    }
  };
  const resetFocus = (event: ChangeEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    if (target.className === "root-wrap") {
      store.dispatch(ActionHiddenFocus("hidden-element"));
    }
    return 0;
  };
  const handleChange =
    (login: string, nameRepository: string) =>
    (event: ChangeEvent<{}>, newExpanded: boolean) => {
      funcCommits(login, nameRepository).then();
      store.dispatch(ActionSetExpanded(newExpanded ? login : ""));
    };
  const arrForSkeleton = Array.from(new Array(15));

  return (
    <div onClick={resetFocus} id="elem" className="root-wrap">
      <Container maxWidth={"md"}>
        <InputSearch />
        {!ReposWithWatchers.length ? (
          arrForSkeleton.map((item, index) => (
            <Skeleton
              key={index}
              variant="rect"
              className={"wrap"}
              width={980}
              height={100}
            />
          ))
        ) : (
          <div />
        )}

        {ReposWithWatchers.map((item, index) => (
          <Accordion
            key={index}
            expanded={expandedLogin === item.data.owner.login}
            onChange={handleChange(item.data.owner.login, item.data.name)}
          >
            <AccordionSummary key={index} className={"wrap border-animation"}>
              <Repository item={item} />
            </AccordionSummary>
            <AccordionDetails className={"accordion-block"}>
              <Commits />
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </div>
  );
};

export default App;
