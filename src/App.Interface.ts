export interface DescCommitsRepos {
  userName: string;
}
export interface DescReposWatchers {
  data: {
    html_url: string;
    name: string;
    subscribers_count: string;
    watchers: string;
    forks: string;
    language: string;
    owner: {
      avatar_url: string;
      html_url: string;
      login: string;
    };
  };
}
