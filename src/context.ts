import * as React from 'react';

interface GitHubButtonStateInterface {
  stargazers: number | null;
  watchers: number | null;
  forks: number | null;
  namespace: string;
  repo: string;
}

export const defaultGitHubButtonState : GitHubButtonStateInterface = {
  stargazers: null,
  watchers: null,
  forks: null,
  namespace: "",
  repo: "",
};

export const GitHubButtonContext = React.createContext(
  defaultGitHubButtonState
);
