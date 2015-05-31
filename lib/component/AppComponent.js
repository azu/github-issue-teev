// LICENSE : MIT
"use strict";
import React from "react"
import GitHubWebView from "./GitHubWebView"
import IssueList from "./IssueList"
import RepositoryIssueList from "./RepositoryIssueList"
export default class AppComponent extends React.Component {
    constructor(...args) {
        super(...args);
        let {issueStore,issueAction} = this.props.context;
        this.issueStore = issueStore;
        this.issueAction = issueAction;
        this.state = {
            myIssues: this.issueStore.getMyIssues(),
            repoIssues: this.issueStore.getRepoIssues(),
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
        var myIssues = this.issueStore.getMyIssues();
        var repoIssues = this.issueStore.getRepoIssues();
        this.setState({
            myIssues,
            repoIssues,
            viewingURL
        });
    }

    onClickIssue(issue) {
        this.issueAction.viewIssue(issue);
    }

    render() {
        return <div className="AppComponent l-main-view">
            <div className="l-left-sidebar">
                <h1 className="AppComponent-sidebar-title">My Issues</h1>
                <IssueList issues={this.state.myIssues} onClickIssue={this.onClickIssue.bind(this)}/>

                <h1 className="AppComponent-sidebar-title">Repo Issues</h1>
                <IssueList issues={this.state.repoIssues} onClickIssue={this.onClickIssue.bind(this)}/>
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