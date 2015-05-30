// LICENSE : MIT
"use strict";
import React from "react"
import GitHubWebView from "./GitHubWebView"
import MyIssueList from "./MyIssueList"
import RepositoryIssueList from "./RepositoryIssueList"
export default class AppComponent extends React.Component {
    constructor(...args) {
        super(...args);
        let {issueStore,issueAction} = this.props.context;
        this.issueStore = issueStore;
        this.issueAction = issueAction;
        this.state = {
            myIssues: [
                {
                    title: "Issueを読む技術",
                    url: "https://github.com/efcl/efcl.github.io/issues/66"
                },
                {
                    "title": "Custom IFRAME attributes in a nwjs (formerly node-webkit) project · Issue #3809 · facebook/react",
                    "url": "https://github.com/facebook/react/issues/3809"
                },               {
                    "title": "Custom IFRAME attributes in a nwjs (formerly node-webkit) project · Issue #3809 · facebook/react",
                    "url": "https://gisdfsdthub.com/facebook/react/issues/3809"
                },               {
                    "title": "Custom IFRAME attributes in a nwjs (formerly node-webkit) project · Issue #3809 · facebook/react",
                    "url": "https://github.com/facasdasbook/react/issues/3809"
                },                {
                    title: "Issueを読む技術",
                    url: "https://github.com/efscl/efcl.gith12ub.io/issues/66"
                },
                {
                    "title": "Custom IFRAME attributes in a nwjs (formerly node-webkit) project · Issue #3809 · facebook/react",
                    "url": "https://github.s/facebook/react/22issues/3809"
                },                {
                    title: "Issueを読む技術",
                    url: "https://github.com/efcl/asefcl.github.io/issues/66"
                },
                {
                    "title": "Custom IFRAME attributes in a nwjs (formerly node-webkit) project · Issue #3809 · facebook/react",
                    "url": "https://github.com/faceboaok/react/issues/3809"
                },                {
                    title: "Issueを読む技術",
                    url: "https://github.com/efcsl/efcl.github.io/issues/66"
                },
                {
                    "title": "Custom IFRAME attributes in a nwjs (formerly node-webkit) project · Issue #3809 · facebook/react",
                    "url": "https://github.com/faceboeeok/react/issues/3809"
                },                {
                    title: "Issueを読む技術",
                    url: "https://github.com/efcl/efcl.gitehub.io/issues/66"
                },
                {
                    "title": "Custom IFRAME attributes in a nwjs (formerly node-webkit) project · Issue #3809 · facebook/react",
                    "url": "https://github.com/facebook/react/isseees/3809"
                }
            ],
            viewingURL: this.issueStore.getViewingURL()
        };
        this.onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        this.issueStore.onChange(this.onChange);
    }

    componentWillUnmount() {
        this.issueAction.removeChangeListener(this.onChange);
    }

    _onChange() {
        var viewingURL = this.issueStore.getViewingURL();
        console.log(viewingURL);
        this.setState({
            viewingURL
        });
    }

    onClickIssue(issue) {
        this.issueAction.viewIssue(issue);
    }

    render() {
        return <div className="AppComponent l-main-view">
            <div className="l-left-sidebar">
                <h1>My Issues</h1>
                <MyIssueList issues={this.state.myIssues} onClickIssue={this.onClickIssue.bind(this)}/>
            </div>
            <div className="l-center-view">
                <GitHubWebView url={this.state.viewingURL}/>
            </div>
            <div className=" l-right-toolbelt">
                <RepositoryIssueList />
            </div>
        </div>;
    }
}