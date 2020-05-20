import * as React from 'react';

import {GitHubButtonContext} from './context';
import ajaxGet from './ajaxGet';

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
  namespace: {
    followers: number | null;
    following: number | null;
    public_repos: number | null;
    public_gists: number | null;
  },
  repo: {
    stargazers: number | null;
    watchers: number | null;
    forks: number | null;
  }
}

export default class GitHubButtonProvider extends React.Component<GitHubButtonProviderProps, GitHubButtonProviderState> {
  namespaceXhr: any = null;
  repoXhr: any = null;

  constructor(props: GitHubButtonProviderProps, context: any) {
    super(props, context);
    this.state = {
      namespace: {
        followers: null,
        following: null,
        public_repos: null,
        public_gists: null,
      },
      repo: {
        stargazers: null,
        watchers: null,
        forks: null,
      },
    };
  }

  getNamespaceRequestUrl() {
    const {namespace} = this.props;
    return `//api.github.com/users/${namespace}`;
  }

  getRepoRequestUrl() {
    const {namespace, repo} = this.props;
    return `//api.github.com/repos/${namespace}/${repo}`;
  }

  updateState() {
    this.namespaceXhr = ajaxGet(this.getNamespaceRequestUrl(), (data:any) => {
      if (!data) return;
      let newState = this.state.namespace;
      for (const t in this.state.namespace) {
        if (data.hasOwnProperty(t)) {
          newState[t] = data[t];
        }
      }
      console.log('namespace:', newState);
      this.setState({namespace: newState});
    })

    this.repoXhr = ajaxGet(this.getRepoRequestUrl(), (data: any) => {
      if (!data) return;
      let newState = this.state.repo;
      for (const t in typeToGitHubKey) {
        if (data.hasOwnProperty(typeToGitHubKey[t])) {
          newState[t] = data[typeToGitHubKey[t]];
        }
      }
      console.log('repo:', newState);
      this.setState({repo: newState});
    });
  }

  componentWillUnmount() {
    if (this.repoXhr) {
      this.repoXhr.abort();
    }
  }

  componentDidUpdate(prevProps: Readonly<GitHubButtonProviderProps>) {
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
      namespace: {
        name: this.props.namespace,
        ...this.state.namespace,
      },
      repo: {
        name: this.props.repo,
        ...this.state.repo
      }
    };
    return (
      <GitHubButtonContext.Provider value={state}>
        {this.props.children}
      </GitHubButtonContext.Provider>
    );
  }

}
