// LICENSE : MIT
"use strict";
import {Action} from "material-flux"
import GitHubAPI from "../util/GitHubAPI"
import parseURL from "parse-github-url"

export var keys = {
    loadMyIssues: Symbol("loadMyIssues"),
    loadRepoIssues: Symbol("loadRepoIssues"),
    viewIssue: Symbol("viewIssue"),
    addFavRepository: Symbol("addFavRepository"),
    removeFavRepository: Symbol("removeFavRepository")
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

    // fav
    addFavRepository(issue) {
        this.dispatch(keys.addFavRepository, issue);
    }

    removeFavRepository(issue) {
        this.dispatch(keys.removeFavRepository, issue);
    }

    viewIssue(issue) {
        this.dispatch(keys.viewIssue, issue);
    }

    viewURL(URL) {
        if(URL==null) {
            return;
        }
        console.log(URL);
        if (!/issues/.test(URL)) {
            return;
        }
        var ghObject = parseURL(URL);
        if (ghObject.repopath == null) {
            return;
        }
        var issueNumber = URL.match(/issues\/(\d*)/)[1];
        console.log(issueNumber);
        var api = new GitHubAPI();
        api.getRepoIssueAsync(ghObject.user, ghObject.repo, issueNumber).then((issue) => {
            this.viewIssue(issue);
        });
    }
}