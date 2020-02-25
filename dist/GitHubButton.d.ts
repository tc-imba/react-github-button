import * as React from 'react';
export interface GitHubButtonProps {
    className?: string;
    type: 'stargazers' | 'watchers' | 'forks';
    size?: 'large';
}
export interface GitHubButtonState {
}
declare class GitHubButton extends React.Component<GitHubButtonProps, GitHubButtonState> {
    getRepoUrl(): string;
    getCountUrl(): string;
    getCount(): any;
    getCountStyle(): {
        display: string;
    } | {
        display?: undefined;
    };
    render(): JSX.Element;
}
export default GitHubButton;
