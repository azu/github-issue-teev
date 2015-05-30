// LICENSE : MIT
"use strict";
import {Store} from "material-flux"
import {keys} from "../action/IssueAction"
export default class IssueStore extends Store {
    constructor(...args) {
        super(...args);
        this.state = {
            viewingIssue: null
        };
        this.register(keys.viewIssue, this.onViewIssue.bind(this));
    }

    getViewingURL() {
        if (this.state.viewingIssue == null) {
            return "https://github.com/";
        }
        return this.state.viewingIssue.url;
    }

    onViewIssue(issue) {
        this.setState({
            viewingIssue: issue
        });
    }
}