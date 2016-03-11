import React, { PropTypes } from 'react';
import ajaxGet from './ajaxGet';

const typeToLabel = {
  stargazers: 'Star',
  watchers: 'Watch',
  forks: 'Fork',
};

const typeToPath = {
  forks: 'network',
};

export default class GitHubButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: null,
    };
  }

  componentDidMount() {
    ajaxGet('https://api.github.com/repos/benjycui/mark-twain', (data) => {
      const count = data[`${this.props.type}_count`];
      this.setState({ count });
    });
  }
  
  render() {
    const { type, namespace, repo, size } = this.props;
    const repoUrl = `//github.com/${namespace}/${repo}/`
    const countUrl = `//github.com/${namespace}/${repo}/${typeToPath[type] || type}/`;
    const state = this.state;
    const count = state.count;
    const countStyle = {
      display: count === null ? 'none' : 'block',
    };
    return (
      <span className={`github-btn ${size === 'large' ? 'github-btn-large' : ''}`}>
        <a className="gh-btn" href={repoUrl} target="_blank">
          <span className="gh-ico" aria-hidden="true"></span>
          <span className="gh-text">{ typeToLabel[type] }</span>
        </a>
        <a className="gh-count" href={countUrl} target="_blank" style={countStyle}>
          { state.count }
        </a>
      </span>
    );
  }
}

GitHubButton.propTypes = {
  type: PropTypes.oneOf([
    'stargazers',
    'watchers',
    'forks',
  ]),
  size: PropTypes.oneOf([
    'large',
  ])
};
