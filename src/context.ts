import * as React from 'react';

interface GitHubButtonStateInterface {

  namespace: {
    name: string;
    followers: number | null;
    following: number | null;
    public_repos: number | null;
    public_gists: number | null;
  };
  repo: {
    name: string;
    stargazers: number | null;
    watchers: number | null;
    forks: number | null;
  };
}

export const defaultGitHubButtonState : GitHubButtonStateInterface = {
  namespace: {
    name: "",
    followers: null,
    following: null,
    public_repos: null,
    public_gists: null,
  },
  repo: {
    name: "",
    stargazers: null,
    watchers: null,
    forks: null,
  },
};

export const GitHubButtonContext = React.createContext(
  defaultGitHubButtonState
);
