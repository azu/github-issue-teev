// LICENSE : MIT
"use strict";
import React from "react"
import MainContext from "./MainContext"
import App from './Component/AppComponent';
var context = new MainContext();
React.render(
    React.createElement(App, {context}),
    document.body
);
context.issueAction.loadMyIssues();
context.issueAction.loadRepoIssues("azu", "azu");