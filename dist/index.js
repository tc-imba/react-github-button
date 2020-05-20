'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var defaultGitHubButtonState = {
    namespace: {
        name: "",
        followers: null,
        following: null,
        public_repos: null,
        public_gists: null,
    },
    repo: {
        name: "",
        stargazers: null,
        watchers: null,
        forks: null,
    },
};
var GitHubButtonContext = React.createContext(defaultGitHubButtonState);

function ajaxGet(url, callback) {
    // @ts-ignore
    if (typeof XDomainRequest !== 'undefined') {
        callback(null);
        return null;
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE &&
            xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
    return xhr;
}

var typeToGitHubKey = {
    stargazers: 'stargazers_count',
    watchers: 'subscribers_count',
    forks: 'forks_count',
};
var GitHubButtonProvider = /** @class */ (function (_super) {
    __extends(GitHubButtonProvider, _super);
    function GitHubButtonProvider(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.namespaceXhr = null;
        _this.repoXhr = null;
        _this.state = {
            namespace: {
                followers: null,
                following: null,
                public_repos: null,
                public_gists: null,
            },
            repo: {
                stargazers: null,
                watchers: null,
                forks: null,
            },
        };
        return _this;
    }
    GitHubButtonProvider.prototype.getNamespaceRequestUrl = function () {
        var namespace = this.props.namespace;
        return "//api.github.com/users/" + namespace;
    };
    GitHubButtonProvider.prototype.getRepoRequestUrl = function () {
        var _a = this.props, namespace = _a.namespace, repo = _a.repo;
        return "//api.github.com/repos/" + namespace + "/" + repo;
    };
    GitHubButtonProvider.prototype.updateState = function () {
        var _this = this;
        this.namespaceXhr = ajaxGet(this.getNamespaceRequestUrl(), function (data) {
            if (!data)
                return;
            var newState = _this.state.namespace;
            for (var t in _this.state.namespace) {
                if (data.hasOwnProperty(t)) {
                    newState[t] = data[t];
                }
            }
            console.log('namespace:', newState);
            _this.setState({ namespace: newState });
        });
        this.repoXhr = ajaxGet(this.getRepoRequestUrl(), function (data) {
            if (!data)
                return;
            var newState = _this.state.repo;
            for (var t in typeToGitHubKey) {
                if (data.hasOwnProperty(typeToGitHubKey[t])) {
                    newState[t] = data[typeToGitHubKey[t]];
                }
            }
            console.log('repo:', newState);
            _this.setState({ repo: newState });
        });
    };
    GitHubButtonProvider.prototype.componentWillUnmount = function () {
        if (this.repoXhr) {
            this.repoXhr.abort();
        }
    };
    GitHubButtonProvider.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.namespace !== prevProps.namespace ||
            this.props.repo !== prevProps.repo) {
            this.updateState();
        }
    };
    GitHubButtonProvider.prototype.componentDidMount = function () {
        this.updateState();
    };
    GitHubButtonProvider.prototype.render = function () {
        var state = {
            namespace: __assign({ name: this.props.namespace }, this.state.namespace),
            repo: __assign({ name: this.props.repo }, this.state.repo)
        };
        return (React.createElement(GitHubButtonContext.Provider, { value: state }, this.props.children));
    };
    return GitHubButtonProvider;
}(React.Component));

var classNames = function (classSet) {
    return Object.keys(classSet).filter(function (key) { return classSet[key]; }).join(' ');
};
var typeToPath = {
    forks: 'network',
    public_repos: '?tab=repositories',
};
var typeToLabel = {
    stargazers: 'Star',
    watchers: 'Watch',
    forks: 'Fork',
    followers: 'Followers',
    following: 'Following',
    public_repos: 'Repos',
    public_gists: 'Gists',
};
var typeToButtonType = {
    stargazers: 'repo',
    watchers: 'repo',
    forks: 'repo',
    followers: 'namespace',
    following: 'namespace',
    public_repos: 'namespace',
    public_gists: 'namespace',
};
var GitHubButton = /** @class */ (function (_super) {
    __extends(GitHubButton, _super);
    function GitHubButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GitHubButton.prototype.getButtonUrl = function () {
        var type = this.props.type;
        var buttonType = typeToButtonType[type];
        var _a = this.context, namespace = _a.namespace, repo = _a.repo;
        if (buttonType == 'repo') {
            return "//github.com/" + namespace.name + "/" + repo.name;
        }
        else {
            return "//github.com/" + namespace.name;
        }
    };
    GitHubButton.prototype.getCountUrl = function () {
        var type = this.props.type;
        var buttonType = typeToButtonType[type];
        var _a = this.context, namespace = _a.namespace, repo = _a.repo;
        if (type == 'public_gists') {
            return "//gist.github.com/" + namespace.name + "/";
        }
        else if (buttonType == 'repo') {
            return "//github.com/" + namespace.name + "/" + repo.name + "/" + (typeToPath[type] || type);
        }
        else {
            return "//github.com/" + namespace.name + "/" + (typeToPath[type] || type);
        }
    };
    GitHubButton.prototype.getCount = function () {
        var type = this.props.type;
        if (this.context.repo.hasOwnProperty(type)) {
            return this.context.repo[type];
        }
        if (this.context.namespace.hasOwnProperty(type)) {
            return this.context.namespace[type];
        }
        return null;
    };
    GitHubButton.prototype.getCountStyle = function () {
        var count = this.getCount();
        if (count !== null) {
            return {
                display: 'block',
            };
        }
        return {};
    };
    GitHubButton.prototype.getLabel = function () {
        var _a = this.props, type = _a.type, label = _a.label;
        if (label)
            return label;
        return typeToLabel[type];
    };
    GitHubButton.prototype.render = function () {
        var _a = this.props, className = _a.className, type = _a.type, size = _a.size, label = _a.label, rest = __rest(_a, ["className", "type", "size", "label"]);
        // delete rest.namespace;
        // delete rest.repo;
        var count = this.getCount();
        // const count = this.state.count;
        var buttonClassName = {
            'github-btn': true,
            'github-btn-large': size === 'large',
        };
        if (className) {
            buttonClassName[className] = className;
        }
        var buttonClassNameStr = classNames(buttonClassName);
        return (React.createElement("span", __assign({}, rest, { className: buttonClassNameStr }),
            React.createElement("a", { className: "gh-btn", href: this.getButtonUrl(), target: "_blank" },
                React.createElement("span", { className: "gh-ico", "aria-hidden": "true" }),
                React.createElement("span", { className: "gh-text" }, this.getLabel())),
            React.createElement("a", { className: "gh-count", target: "_blank", href: this.getCountUrl(), style: this.getCountStyle() }, count)));
    };
    return GitHubButton;
}(React.Component));
GitHubButton.contextType = GitHubButtonContext;

exports.GitHubButtonProvider = GitHubButtonProvider;
exports.GitHubButton = GitHubButton;
//# sourceMappingURL=index.js.map
