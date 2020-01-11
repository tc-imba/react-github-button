import * as React from 'react';

import {GitHubButtonContext} from '../context';
import ajaxGet from '../ajaxGet';

const typeToGitHubKey = {
  stargazers: 'stargazers_count',
  watchers: 'subscribers_count',
  forks: 'forks_count',
};

export interface GitHubButtonProviderProps {
  namespace: string;
  repo: string;
}

export interface GitHubButtonProviderState {
  stargazers: number;
  watchers: number;
  forks: number;
}

export default class GitHubButtonProvider extends React.Component<GitHubButtonProviderProps, GitHubButtonProviderState> {
  xhr: any = null;

  constructor(props: GitHubButtonProviderProps, context: any) {
    super(props, context);
    this.state = {
      stargazers: null,
      watchers: null,
      forks: null,
    };
  }

  getRequestUrl() {
    const {namespace, repo} = this.props;
    return `//api.github.com/repos/${namespace}/${repo}`;
  }

  updateState() {
    this.xhr = ajaxGet(this.getRequestUrl(), (data) => {
      if (!data) return;
      let newState = this.state;
      for (const t in typeToGitHubKey) {
        if (data.hasOwnProperty(typeToGitHubKey[t])) {
          newState[t] = data[typeToGitHubKey[t]];
        }
      }
      console.log(newState);
      this.setState(newState);
    });
  }

  componentWillUnmount() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  componentDidUpdate(
    prevProps: Readonly<GitHubButtonProviderProps>,
    prevState: Readonly<GitHubButtonProviderState>, snapshot?: any) {
    if (this.props.namespace !== prevProps.namespace ||
      this.props.repo !== prevProps.repo) {
      this.updateState();
    }
  }

  componentDidMount() {
    this.updateState();
  }

  render() {
    const state = {
      ...this.state,
      namespace: this.props.namespace,
      repo: this.props.repo,
    };
    return (
      <GitHubButtonContext.Provider value={state}>
        {this.props.children}
      </GitHubButtonContext.Provider>
    );
  }

}
