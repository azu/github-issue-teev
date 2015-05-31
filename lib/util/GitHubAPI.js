// LICENSE : MIT
"use strict";
import GitHub from "github"
import Promise from "bluebird"

export default class GitHubAPI {
    constructor() {
        this.client = new GitHub({
            // required
            version: "3.0.0",
            debug: true,
            headers: {
                "user-agent": "github-issue-teev"
            }
        });
        this.client.authenticate({
            type: "oauth",
            token: localStorage.getItem("github-token") || ""
        });
    }

    getMyIssuesAsync() {
        return new Promise((resolve, reject)=> {
            this.client.issues.getAll({
                sort: "updated"
            }, (error, response)=> {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    }

    getRepoIssuesAsync(user, repo) {
        return new Promise((resolve, reject)=> {
            this.client.issues.repoIssues({
                user: user,
                repo: repo,
                sort: "updated"
            }, (error, response)=> {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    }

    getRepoIssueAsync(user, repo, number) {
        return new Promise((resolve, reject)=> {
            this.client.issues.getRepoIssue({
                user: user,
                repo: repo,
                number: number
            }, (error, response)=> {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    }

    getIssueComments(user, repo, number) {
        return new Promise((resolve, reject)=> {
            this.client.issues.getComments({
                user: user,
                repo: repo,
                number: number
            }, (error, response)=> {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    }
}