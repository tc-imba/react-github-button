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
export declare const defaultGitHubButtonState: GitHubButtonStateInterface;
export declare const GitHubButtonContext: React.Context<GitHubButtonStateInterface>;
export {};
