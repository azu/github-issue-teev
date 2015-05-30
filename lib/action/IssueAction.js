// LICENSE : MIT
"use strict";
import {Action} from "material-flux"
import GitHubAPI from "../util/GitHubAPI"
export var keys = {
    loadMyIssues: Symbol("loadMyIssues"),
    loadRepoIssues: Symbol("loadRepoIssues"),
    viewIssue: Symbol("viewIssue")
};
export default class IssueStore extends Action {
    loadMyIssues() {
        var api = new GitHubAPI();
        api.getMyIssuesAsync().then((response) => {
            this.dispatch(keys.loadMyIssues, response);
        });
    }

    loadRepoIssues(user, repo) {
        var api = new GitHubAPI();
        api.getRepoIssuesAsync(user, repo).then((response) => {
            this.dispatch(keys.loadRepoIssues, response);
        });
    }

    viewIssue(issue) {
        this.dispatch(keys.viewIssue, issue);
    }
}