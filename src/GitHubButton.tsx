import * as React from 'react';
import {GitHubButtonContext} from './context';

const classNames = function(classSet: any) {
  return Object.keys(classSet).filter((key) => classSet[key]).join(' ');
};

const typeToPath = {
  forks: 'network',
};

const typeToLabel = {
  stargazers: 'Star',
  watchers: 'Watch',
  forks: 'Fork',
};

export interface GitHubButtonProps {
  className?: string
  type: 'stargazers' | 'watchers' | 'forks';
  size?: 'large';
}

export interface GitHubButtonState {
}

class GitHubButton extends React.Component<GitHubButtonProps, GitHubButtonState> {

  getRepoUrl() {
    const {namespace, repo} = this.context;
    return `//github.com/${namespace}/${repo}/`;
  }

  getCountUrl() {
    const {namespace, repo} = this.context;
    const {type} = this.props;
    return `//github.com/${namespace}/${repo}/${typeToPath[type] || type}/`;
  }

  getCount() {
    if (this.context.hasOwnProperty(this.props.type)) {
      return this.context[this.props.type];
    }
    return null;
  }

  getCountStyle() {
    const count = this.getCount();
    if (count !== null) {
      return {
        display: 'block',
      };
    }
    return {};
  }

  render() {
    const {className, type, size, ...rest} = this.props;
    // delete rest.namespace;
    // delete rest.repo;
    const count = this.getCount();

    // const count = this.state.count;

    let buttonClassName = {
      'github-btn': true,
      'github-btn-large': size === 'large',
      // [className]: className,
    };
    if (className) {
      buttonClassName[className] = className;
    }

    const buttonClassNameStr = classNames(buttonClassName);

    return (
      <span {...rest} className={buttonClassNameStr}>
        <a className="gh-btn" href={this.getRepoUrl()} target="_blank">
          <span className="gh-ico" aria-hidden="true"></span>
          <span className="gh-text">{typeToLabel[type]}</span>
        </a>
        <a className="gh-count" target="_blank"
           href={this.getCountUrl()}
           style={this.getCountStyle()}
        >
          {count}
        </a>
      </span>
    );

  }
}

GitHubButton.contextType = GitHubButtonContext;

export default GitHubButton;
