# react-github-button

<!--[![](https://img.shields.io/travis/benjycui/react-github-button.svg?style=flat-square)](https://travis-ci.org/benjycui/react-github-button)-->
<!--[![npm package](https://img.shields.io/npm/v/react-github-button.svg?style=flat-square)](https://www.npmjs.org/package/react-github-button)-->
<!--[![NPM downloads](http://img.shields.io/npm/dm/react-github-button.svg?style=flat-square)](https://npmjs.org/package/react-github-button)-->
<!--[![Dependency Status](https://david-dm.org/benjycui/react-github-button.svg?style=flat-square)](https://david-dm.org/benjycui/react-github-button)-->

Unofficial GitHub buttons in React.

forked from [benjycui/react-github-button](https://github.com/benjycui/react-github-button)

The original `react-github-button` will make an xhr request for each `GitHubButton`, and only supports repo buttons (star, watch, fork).

This one use `GitHubButtonProvider` to make xhr request so that all `GitHubButton` in the provider can use the result. It also support user buttons (follower, following, repo, gist).


## Installation

```bash
npm install --save tc-imba/react-github-button
```

or

```bash
yarn add tc-imba/react-github-button
```

## Usage

See `examples/src/App.tsx`.

```typescript jsx
import 'react-github-button/src/styles.css';
import {GitHubButton, GitHubButtonProvider} from 'react-github-button';

ReactDOM.render(
  <GitHubButtonProvider namespace="tc-imba" repo="react-github-button">
    <div className="buttons">
      <GitHubButton size="large" type="followers"/>
      <GitHubButton size="large" type="following"/>
      <GitHubButton size="large" type="public_repos"/>
      <GitHubButton size="large" type="public_gists"/>
    </div>
    <div className="buttons">
      <GitHubButton size="large" type="stargazers"/>
      <GitHubButton size="large" type="watchers"/>
      <GitHubButton size="large" type="forks"/>
    </div>
  </GitHubButtonProvider>,
  document.getElementById('root')
);
```

## API

### GitHubButton

```typescript
export interface GitHubButtonProps {
  className?: string
  type: 'stargazers' | 'watchers' | 'forks' | 'followers' | 'following' | 'public_repos' | 'public_gists';
  size?: 'large';
  label?: JSX.Element | string;
}
```

### GitHubButtonProvider

```typescript
export interface GitHubButtonProviderProps {
  namespace: string; // Your GitHub id or organization name.
  repo: string;      // The name of your repository.
}
```

## License

MIT
