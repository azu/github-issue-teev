// LICENSE : MIT
"use strict";
import GitHub from "github"
import Promise from "bluebird"
class GitHubAPI {
    constructor(token) {
        this.client = new GitHub({
            // required
            version: "3.0.0",
            debug: false,
            timeout: 5000,
            headers: {
                "user-agent": "github-issue-teev"
            }
        });
        this.token = token;
        this.client.authenticate({
            type: "oauth",
            token: token || localStorage.getItem("github-token") || "dummy"
        });
    }

    testToken() {
        return this.getMyIssuesAsync().then(()=> {
            localStorage.setItem("github-token", this.token);
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
GitHubAPI.isTokenError = function (error) {
    if (!(error instanceof Error)) {
        return false;
    }
    var code = error.code;
    if (code === 401) {
        return true
    }
};
export default GitHubAPI;