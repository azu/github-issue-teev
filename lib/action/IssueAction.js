// LICENSE : MIT
"use strict";
import {Action} from "material-flux"
export var keys = {
    loadMyIssue: Symbol("loadMyIssue"),
    viewIssue: Symbol("viewIssue")
};
export default class IssueStore extends Action {
    loadMyIssue() {
        this.dispatch(keys.loadMyIssue);
    }

    viewIssue(issue) {
        this.dispatch(keys.viewIssue, issue);
    }
}