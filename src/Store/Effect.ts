import axios from "axios";
import { gitToken } from "./Reducer";
import { ActionCommitGit, ActionGitRepo } from "./Action";

interface DescRepos {
  url: string;
  data: [
    {
      userName: string;
    }
  ];
}

const repeatedReqReposWithWatchers =
  (repos: DescRepos[]) =>
  // @ts-ignore
  async (dispatch) => {
    try {
      let reposArray: any[] = [];
      await repos.forEach((item) => {
        const res = axios.get(item.url, {
          headers: {
            Authorization: `token ${gitToken}`,
          },
        });
        reposArray.push(res);
      });
      const result = await Promise.all(reposArray);
      dispatch(ActionGitRepo(result));
    } catch (err) {
      console.log(err);
    }
  };

const getCommitsWithGit =
  (login: string, nameRepo: string) =>
  // @ts-ignore
  async (dispatch) => {
    try {
      const res: DescRepos = await axios.get(
        `https://api.github.com/repos/${login}/${nameRepo}/commits?per_page=5`,
        {
          headers: {
            Authorization: `token ${gitToken}`,
          },
        }
      );
      const newExtendedObj: object[] = res.data.map((item) => {
        item.userName = login;
        return item;
      });
      dispatch(ActionCommitGit(newExtendedObj));
    } catch (err) {
      console.log(err);
      if (err.response.status === 409) {
        const data = [
          {
            userName: login,
            sha: [],
          },
        ];
        dispatch(ActionCommitGit(data));
      }
    }
  };

export { getCommitsWithGit, repeatedReqReposWithWatchers };
