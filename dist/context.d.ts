import * as React from 'react';
interface GitHubButtonStateInterface {
    stargazers: number | null;
    watchers: number | null;
    forks: number | null;
    namespace: string;
    repo: string;
}
export declare const defaultGitHubButtonState: GitHubButtonStateInterface;
export declare const GitHubButtonContext: React.Context<GitHubButtonStateInterface>;
export {};
