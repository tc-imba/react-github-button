# react-github-button

Unofficial GitHub buttons in React.

## Installation

```bash
npm install --save react-github-button
```

## Usage

```jsx
import GitHubButton from 'react-github-button';

ReactDOM.render(
  <GitHubButton type="stargazers" size="large" namespace="benjycui" repo="react-github-button" />
  , mountNode
);
```

## API

### type

> Enum{ 'stargazers', 'watchers', 'forks' }

### size

> Enum{ 'default', 'large' }

### namespace

> String

Your GitHub id or organization name.

### repo

> String

The name of your repository.

## Liscense

MIT
