import * as React from 'react';
import { GitHubButtonContext } from './context';
export interface GitHubButtonProps {
    className?: string;
    type: 'stargazers' | 'watchers' | 'forks' | 'followers' | 'following' | 'public_repos' | 'public_gists';
    size?: 'large';
    label?: JSX.Element | string;
}
export interface GitHubButtonState {
}
declare class GitHubButton extends React.Component<GitHubButtonProps, GitHubButtonState> {
    context: React.ContextType<typeof GitHubButtonContext>;
    getButtonUrl(): string;
    getCountUrl(): string;
    getCount(): any;
    getCountStyle(): {
        display: string;
    } | {
        display?: undefined;
    };
    getLabel(): string | JSX.Element;
    render(): JSX.Element;
}
export default GitHubButton;
