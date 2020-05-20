import * as React from 'react';
import {GitHubButtonContext} from './context';

const classNames = function(classSet: any) {
  return Object.keys(classSet).filter((key) => classSet[key]).join(' ');
};

const typeToPath = {
  forks: 'network',
  public_repos: '?tab=repositories',
};

const typeToLabel = {
  stargazers: 'Star',
  watchers: 'Watch',
  forks: 'Fork',
  followers: 'Followers',
  following: 'Following',
  public_repos: 'Repos',
  public_gists: 'Gists',
};

const typeToButtonType = {
  stargazers: 'repo',
  watchers: 'repo',
  forks: 'repo',
  followers: 'namespace',
  following: 'namespace',
  public_repos: 'namespace',
  public_gists: 'namespace',
}

export interface GitHubButtonProps {
  className?: string
  type: 'stargazers' | 'watchers' | 'forks' | 'followers' | 'following' | 'public_repos' | 'public_gists';
  size?: 'large';
  label?: JSX.Element | string;
}

export interface GitHubButtonState {
}

class GitHubButton extends React.Component<GitHubButtonProps, GitHubButtonState> {
  context: React.ContextType<typeof GitHubButtonContext>;

  getButtonUrl() {
    const {type} = this.props;
    const buttonType = typeToButtonType[type];
    const {namespace, repo} = this.context;
    if (buttonType == 'repo') {
      return `//github.com/${namespace.name}/${repo.name}`;
    } else {
      return `//github.com/${namespace.name}`;
    }
  }

  getCountUrl() {
    const {type} = this.props;
    const buttonType = typeToButtonType[type];
    const {namespace, repo} = this.context;

    if (type=='public_gists') {
      return `//gist.github.com/${namespace.name}/`;
    } else if (buttonType == 'repo') {
      return `//github.com/${namespace.name}/${repo.name}/${typeToPath[type] || type}`;
    } else {
      return `//github.com/${namespace.name}/${typeToPath[type] || type}`;
    }
  }

  getCount() {
    const {type} = this.props;
    if (this.context.repo.hasOwnProperty(type) ) {
      return this.context.repo[type];
    }
    if (this.context.namespace.hasOwnProperty(type)) {
      return this.context.namespace[type];
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

  getLabel() {
    const {type, label} = this.props;
    if (label) return label;
    return typeToLabel[type];
  }

  render() {
    const {className, type, size, label, ...rest} = this.props;
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
        <a className="gh-btn" href={this.getButtonUrl()} target="_blank">
          <span className="gh-ico" aria-hidden="true"></span>
          <span className="gh-text">{this.getLabel()}</span>
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
