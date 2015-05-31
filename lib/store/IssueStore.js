// LICENSE : MIT
"use strict";
import {Store} from "material-flux"
import {keys} from "../action/IssueAction"
import parseURL from "parse-github-url"
export default class IssueStore extends Store {
    constructor(...args) {
        super(...args);
        this.state = {
            myIssues: [],
            repoIssues: [],
            favRepositories: localStorage.getItem("favRepositories") || [],
            viewingIssue: null
        };
        console.log(this.state.favRepositories);
        this.register(keys.viewIssue, this.onViewIssue.bind(this));
        this.register(keys.loadMyIssues, this.onLoadMyIssues.bind(this));
        this.register(keys.loadRepoIssues, this.onLoadRepoIssues.bind(this));
        this.register(keys.addFavRepository, this.onAddFavIssue.bind(this));
        this.register(keys.removeFavRepository, this.onRemoveFavIssue.bind(this));
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

    getViewingURL() {
        if (this.state.viewingIssue == null) {
            return "https://github.com/";
        }
        return this.state.viewingIssue.html_url;
    }

    isFavIssue(issue){
        if(issue == null) {
            return false;
        }
        var ghObject = parseURL(issue.html_url);
        var repositoryURL = "https://github.com/" + ghObject.repopath;
        var repositories = localStorage.getItem("favRepositories") || [];
        return repositories.some(function (favRepository) {
            return favRepository === repositoryURL;
        });
    }
    // ====
    onAddFavIssue(issue) {
        var ghObject = parseURL(issue.html_url);
        var repositoryURL = "https://github.com/" + ghObject.repopath;
        var repositories = localStorage.getItem("favRepositories") || [];
        var existingIssue = repositories.some(function (favRepository) {
            return favRepository === repositoryURL;
        });
        if (!existingIssue) {
            repositories.push(repositoryURL);
            localStorage.setItem("favRepositories", repositories)
        }
        this.setState({
            favRepositories: repositories
        });
    }

    onRemoveFavIssue(issue) {
        var ghObject = parseURL(issue.html_url);
        var repositoryURL = "https://github.com/" + ghObject.repopath;
        var repositories = localStorage.getItem("favRepositories") || [];
        var filteredRepositories = repositories.filter(function (favRepository) {
            return favRepository !== repositoryURL;
        });
        localStorage.setItem("favRepositories", repositories);
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

    onViewIssue(issue) {
        this.setState({
            viewingIssue: issue
        });
    }
}