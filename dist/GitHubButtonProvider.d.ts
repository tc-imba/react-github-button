import * as React from 'react';
export interface GitHubButtonProviderProps {
    namespace: string;
    repo: string;
}
export interface GitHubButtonProviderState {
    stargazers: number | null;
    watchers: number | null;
    forks: number | null;
}
export default class GitHubButtonProvider extends React.Component<GitHubButtonProviderProps, GitHubButtonProviderState> {
    xhr: any;
    constructor(props: GitHubButtonProviderProps, context: any);
    getRequestUrl(): string;
    updateState(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: Readonly<GitHubButtonProviderProps>): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
