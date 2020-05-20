import React from 'react';

import 'react-github-button/src/styles.css';
import {GitHubButton, GitHubButtonProvider} from 'react-github-button';

import logo from './logo.svg';
import './App.css';

function App() {
  const label = <div>
    Follow @tc-imba
  </div>;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          tc-imba/react-github-button
        </p>
        <GitHubButtonProvider namespace="tc-imba" repo="react-github-button">
          <div className="buttons">
            <GitHubButton size="large" type="followers" label={label} className="github-btn-long"/>
            <GitHubButton size="large" type="following"/>
            <GitHubButton size="large" type="public_repos"/>
            <GitHubButton size="large" type="public_gists"/>
          </div>
          <div className="buttons">
            <GitHubButton size="large" type="stargazers"/>
            <GitHubButton size="large" type="watchers"/>
            <GitHubButton size="large" type="forks"/>
          </div>
        </GitHubButtonProvider>
      </header>
    </div>
  );
}

export default App;
