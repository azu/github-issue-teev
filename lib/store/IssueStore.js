// LICENSE : MIT
"use strict";
import {Store} from "material-flux"
import {keys} from "../action/IssueAction"
import parseURL from "github-url-parse"
import storage from "local-storage"
import GitHubAPI from "../util/GitHubAPI"
import Promise from "bluebird"
function sortDate(aItem, bItem) {
    var a = new Date(aItem["updated_at"]),
        b = new Date(bItem["updated_at"]);
    return (b.getTime() - a.getTime());
}
export default class IssueStore extends Store {
    constructor(...args) {
        super(...args);
        this.state = {
            myIssues: [],
            repoIssues: [],
            favRepositories: storage.get("favRepositories") || [],
            viewingIssue: null,
            viewingIssueComments: null,
            validGitHubToken: true
        };
        this.register(keys.viewIssue, this.onViewIssue.bind(this));
        this.register(keys.loadMyIssues, this.onLoadMyIssues.bind(this));
        this.register(keys.loadRepoIssues, this.onLoadRepoIssues.bind(this));
        this.register(keys.addFavRepository, this.onAddFavIssue.bind(this));
        this.register(keys.removeFavRepository, this.onRemoveFavIssue.bind(this));
        this.register(keys.validGitHubToken, this.onValidGitHubToken.bind(this));

        this.loadIssuesFromRepositories(this.state.favRepositories);
    }

    getMyIssues() {
        return this.state.myIssues;
    }

    getRepoIssues() {
        return this.state.repoIssues;
    }

    getViewingIssue() {
        return this.state.viewingIssue;
    }

    getViewingIssueComments() {
        return this.state.viewingIssueComments;
    }

    getViewingURL() {
        if (this.state.viewingIssue == null) {
            return "https://github.com/";
        }
        return this.state.viewingIssue.html_url;
    }

    isFavIssue(issue) {
        if (issue == null) {
            return false;
        }
        var ghObject = parseURL(issue.html_url);
        var repositoryURL = "https://github.com/" + ghObject.user + "/" + ghObject.repo;
        var repositories = storage.get("favRepositories") || [];
        return repositories.some(function (favRepository) {
            return favRepository === repositoryURL;
        });
    }

    loadIssuesFromRepositories(repositories) {
        var api = new GitHubAPI();
        return api.getIssuesFromRepositories(repositories).then((issues)=> {
            this.setState({
                repoIssues: issues.sort(sortDate)
            });
        })
    }

    isValidGitHubToken() {
        return this.state.validGitHubToken;
    }

    // ====
    onAddFavIssue(issue) {
        var ghObject = parseURL(issue.html_url);
        var repositoryURL = "https://github.com/" + ghObject.user + "/" + ghObject.repo;
        var repositories = storage.get("favRepositories") || [];
        var existingIssue = repositories.some(function (favRepository) {
            return favRepository === repositoryURL;
        });
        // already faved
        if (existingIssue) {
            return;
        }
        repositories.push(repositoryURL);
        storage.set("favRepositories", repositories);
        this.loadIssuesFromRepositories(repositories);
        this.setState({
            favRepositories: repositories
        });
    }

    onRemoveFavIssue(issue) {
        var ghObject = parseURL(issue.html_url);
        var repositoryURL = "https://github.com/" + ghObject.user + "/" + ghObject.repo;
        var repositories = storage.get("favRepositories") || [];
        var existingIssue = repositories.some(function (favRepository) {
            return favRepository === repositoryURL;
        });
        // not found
        if (!existingIssue) {
            return;
        }
        var filteredRepositories = repositories.filter(function (favRepository) {
            return favRepository !== repositoryURL;
        });
        storage.set("favRepositories", filteredRepositories);
        this.loadIssuesFromRepositories(filteredRepositories);
        this.setState({
            favRepositories: filteredRepositories
        });
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

    onViewIssue(issue, comments) {
        this.setState({
            viewingIssue: issue,
            viewingIssueComments: comments
        });
    }

    onValidGitHubToken(isValid) {
        this.setState({
            validGitHubToken: isValid
        });
    }
}