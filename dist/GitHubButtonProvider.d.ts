import * as React from 'react';
export interface GitHubButtonProviderProps {
    namespace: string;
    repo?: string;
}
export interface GitHubButtonProviderState {
    namespace: {
        followers: number | null;
        following: number | null;
        public_repos: number | null;
        public_gists: number | null;
    };
    repo: {
        stargazers: number | null;
        watchers: number | null;
        forks: number | null;
    };
}
export default class GitHubButtonProvider extends React.Component<GitHubButtonProviderProps, GitHubButtonProviderState> {
    namespaceXhr: any;
    repoXhr: any;
    static defaultProps: {
        repo: string;
    };
    constructor(props: GitHubButtonProviderProps, context: any);
    getNamespaceRequestUrl(): string;
    getRepoRequestUrl(): string;
    updateState(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: Readonly<GitHubButtonProviderProps>): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
