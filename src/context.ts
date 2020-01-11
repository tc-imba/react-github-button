import * as React from 'react';

export const defaultGitHubButtonState = {
  stargazers: null,
  watchers: null,
  forks: null,
  namespace: "",
  repo: "",
};

export const GitHubButtonContext = React.createContext(
  defaultGitHubButtonState
);
