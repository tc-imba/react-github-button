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
    ajaxGet(this.getRequestUrl(), (data) => {
      const count = data[`${this.props.type}_count`];
      this.setState({ count });
    });
  }

  getRequestUrl() {
    const { namespace, repo } = this.props;
    return `//api.github.com/repos/${namespace}/${repo}`;
  }

  getRepoUrl() {
    const { namespace, repo } = this.props;
    return `//github.com/${namespace}/${repo}/`;
  }

  getCountUrl() {
    const { namespace, repo, type } = this.props;
    return `//github.com/${namespace}/${repo}/${typeToPath[type] || type}/`;
  }

  getCountStyle() {
    const count = this.state.count;
    if (count !== null) {
      return {
        display: 'block',
      };
    }
    return null;
  }

  render() {
    const { type, size } = this.props;
    const count = this.state.count;
    return (
      <span className={`github-btn ${size === 'large' ? 'github-btn-large' : ''}`}>
        <a className="gh-btn" href={this.getRepoUrl()} target="_blank">
          <span className="gh-ico" aria-hidden="true"></span>
          <span className="gh-text">{ typeToLabel[type] }</span>
        </a>
        <a className="gh-count" target="_blank"
          href={this.getCountUrl()}
          style={this.getCountStyle()}
        >
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
  ]),
  namespace: PropTypes.string,
  repo: PropTypes.string,
};
