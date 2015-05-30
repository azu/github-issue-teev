// LICENSE : MIT
"use strict";
import {Context} from "material-flux"
import IssueAction from "./action/IssueAction"
import IssueStore from "./store/IssueStore"
export default class MainContext extends Context {
    constructor() {
        super();
        this.issueAction = new IssueAction(this);
        this.issueStore = new IssueStore(this);
    }
}