// LICENSE : MIT
"use strict";
import React from "react"
import GitHubWebView from "./GitHubWebView"
import IssueList from "./IssueList"
import RepositoryIssueList from "./RepositoryIssueList"
import RepositoryToolbelt from "./RepositoryToolbelt"
import GitHubTokenForm from "./GitHubTokenForm"
import IssueListToolbar from "./IssueListToolbar"

export default class AppComponent extends React.Component {
    constructor(...args) {
        super(...args);
        let {issueStore,issueAction} = this.props.context;
        this.issueStore = issueStore;
        this.issueAction = issueAction;
        this.state = {
            myIssues: this.issueStore.getMyIssues(),
            repoIssues: this.issueStore.getRepoIssues(),
            viewingURL: this.issueStore.getViewingURL(),
            viewingIssue: this.issueStore.getViewingIssue(),
            viewingIssueComments: this.issueStore.getViewingIssueComments()
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
        var viewingIssue = this.issueStore.getViewingIssue();
        var viewingIssueComments = this.issueStore.getViewingIssueComments();
        this.setState({
            myIssues,
            repoIssues,
            viewingIssue,
            viewingIssueComments,
            viewingURL
        });
    }

    onClickIssue(issue) {
        this.issueAction.viewIssue(issue);
    }

    changeViewingURL(URL) {
        this.issueAction.viewURL(URL);
    }

    isFavRepository(issue) {
        return this.issueStore.isFavIssue(issue);
    }

    testToken(token) {
        this.issueAction.validGitHubToken(token);
    }

    onRefresh() {
        this.issueAction.loadMyIssues()
    }

    render() {
        if (!this.issueStore.isValidGitHubToken()) {
            return <div className="AppComponent l-main-view">
                <div className="l-left-sidebar">
                    <GitHubTokenForm testToken={this.testToken.bind(this)}/>
                </div>
            </div>;
        }
        return <div className="AppComponent l-main-view">
            <div className="l-left-sidebar AppComponent-sidebar">
                <IssueListToolbar onRefresh={this.onRefresh.bind(this)} />
                <h1 className="AppComponent-sidebar-title">My Issues</h1>
                <IssueList issues={this.state.myIssues} onClickIssue={this.onClickIssue.bind(this)}/>

                <h1 className="AppComponent-sidebar-title">Repo Issues</h1>
                <IssueList issues={this.state.repoIssues} onClickIssue={this.onClickIssue.bind(this)}/>
            </div>

            <div className="l-center-view">
                <GitHubWebView url={this.state.viewingURL}
                               changeViewURL={this.changeViewingURL.bind(this)}/>
            </div>
            <div className=" l-right-toolbelt">
                <RepositoryToolbelt issue={this.state.viewingIssue}
                                    isFavRepository={this.isFavRepository.bind(this)}
                                    addFavRepository={this.issueAction.addFavRepository.bind(this.issueAction)}
                                    removeFavRepository={this.issueAction.removeFavRepository.bind(this.issueAction)}
                    />
                <RepositoryIssueList issue={this.state.viewingIssue} comments={this.state.viewingIssueComments}/>
            </div>
        </div>;
    }
}