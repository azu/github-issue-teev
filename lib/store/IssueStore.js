// LICENSE : MIT
"use strict";
import {Store} from "material-flux"
import {keys} from "../action/IssueAction"
export default class IssueStore extends Store {
    constructor(...args) {
        super(...args);
        this.state = {
            myIssues: [],
            repoIssues: [],
            viewingIssue: null
        };
        this.register(keys.viewIssue, this.onViewIssue.bind(this));
        this.register(keys.loadMyIssues, this.onLoadMyIssues.bind(this));
        this.register(keys.loadRepoIssues, this.onLoadRepoIssues.bind(this));
    }

    getMyIssues() {
        return this.state.myIssues;
    }

    getRepoIssues() {
        return this.state.repoIssues;
    }

    getViewingURL() {
        if (this.state.viewingIssue == null) {
            return "https://github.com/";
        }
        return this.state.viewingIssue.html_url;
    }

    onLoadMyIssues(issues) {
        this.setState({
            myIssues: issues
        });
    }

    onLoadRepoIssues(issues) {
        this.setState({
            repoIssues: issues
        });
    }

    onViewIssue(issue) {
        this.setState({
            viewingIssue: issue
        });
    }
}