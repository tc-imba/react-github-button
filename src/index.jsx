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
    ajaxGet(this.getRepoUrl(), (data) => {
      const count = data[`${this.props.type}_count`];
      this.setState({ count });
    });
  }

  getRepoUrl() {
    const { namespace, repo } = this.props;
    return `//github.com/${namespace}/${repo}/`;
  }

  getCountUrl() {
    const { namespace, repo, type } = this.props;
    return `//github.com/${namespace}/${repo}/${typeToPath[type] || type}/`;
  }
  
  render() {
    const { type, size } = this.props;
    const count = this.state.count;
    const countStyle = {
      display: count === null ? 'none' : 'block',
    };
    return (
      <span className={`github-btn ${size === 'large' ? 'github-btn-large' : ''}`}>
        <a className="gh-btn" href={this.getRepoUrl()} target="_blank">
          <span className="gh-ico" aria-hidden="true"></span>
          <span className="gh-text">{ typeToLabel[type] }</span>
        </a>
        <a className="gh-count" href={this.getCountUrl()} target="_blank" style={countStyle}>
          { count }
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
