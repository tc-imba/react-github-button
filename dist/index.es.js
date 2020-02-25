import { createElement, Component, createContext } from 'react';

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
    stargazers: null,
    watchers: null,
    forks: null,
    namespace: "",
    repo: "",
};
var GitHubButtonContext = createContext(defaultGitHubButtonState);

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
        _this.xhr = null;
        _this.state = {
            stargazers: null,
            watchers: null,
            forks: null,
        };
        return _this;
    }
    GitHubButtonProvider.prototype.getRequestUrl = function () {
        var _a = this.props, namespace = _a.namespace, repo = _a.repo;
        return "//api.github.com/repos/" + namespace + "/" + repo;
    };
    GitHubButtonProvider.prototype.updateState = function () {
        var _this = this;
        this.xhr = ajaxGet(this.getRequestUrl(), function (data) {
            if (!data)
                return;
            var newState = _this.state;
            for (var t in typeToGitHubKey) {
                if (data.hasOwnProperty(typeToGitHubKey[t])) {
                    newState[t] = data[typeToGitHubKey[t]];
                }
            }
            console.log(newState);
            _this.setState(newState);
        });
    };
    GitHubButtonProvider.prototype.componentWillUnmount = function () {
        if (this.xhr) {
            this.xhr.abort();
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
        var state = __assign({}, this.state, { namespace: this.props.namespace, repo: this.props.repo });
        return (createElement(GitHubButtonContext.Provider, { value: state }, this.props.children));
    };
    return GitHubButtonProvider;
}(Component));

var classNames = function (classSet) {
    return Object.keys(classSet).filter(function (key) { return classSet[key]; }).join(' ');
};
var typeToPath = {
    forks: 'network',
};
var typeToLabel = {
    stargazers: 'Star',
    watchers: 'Watch',
    forks: 'Fork',
};
var GitHubButton = /** @class */ (function (_super) {
    __extends(GitHubButton, _super);
    function GitHubButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GitHubButton.prototype.getRepoUrl = function () {
        var _a = this.context, namespace = _a.namespace, repo = _a.repo;
        return "//github.com/" + namespace + "/" + repo + "/";
    };
    GitHubButton.prototype.getCountUrl = function () {
        var _a = this.context, namespace = _a.namespace, repo = _a.repo;
        var type = this.props.type;
        return "//github.com/" + namespace + "/" + repo + "/" + (typeToPath[type] || type) + "/";
    };
    GitHubButton.prototype.getCount = function () {
        if (this.context.hasOwnProperty(this.props.type)) {
            return this.context[this.props.type];
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
    GitHubButton.prototype.render = function () {
        var _a = this.props, className = _a.className, type = _a.type, size = _a.size, rest = __rest(_a, ["className", "type", "size"]);
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
        return (createElement("span", __assign({}, rest, { className: buttonClassNameStr }),
            createElement("a", { className: "gh-btn", href: this.getRepoUrl(), target: "_blank" },
                createElement("span", { className: "gh-ico", "aria-hidden": "true" }),
                createElement("span", { className: "gh-text" }, typeToLabel[type])),
            createElement("a", { className: "gh-count", target: "_blank", href: this.getCountUrl(), style: this.getCountStyle() }, count)));
    };
    return GitHubButton;
}(Component));
GitHubButton.contextType = GitHubButtonContext;

export { GitHubButtonProvider, GitHubButton };
//# sourceMappingURL=index.es.js.map
