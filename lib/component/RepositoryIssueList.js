// LICENSE : MIT
"use strict";
import React from "react"
global.React = require('react');
var md2react = require("md2react");

var todoRegexp = /^-\s*\[[x ]\]\s*/;
function isTODO(line) {
    return todoRegexp.test(line);
}
function flatten([first, ...rest]) {
    if (first === undefined) {
        return [];
    }
    else if (!Array.isArray(first)) {
        return [first, ...flatten(rest)];
    }
    else {
        return [...flatten(first), ...flatten(rest)];
    }
}
export default class RepositoryIssueList extends React.Component {
    static get propTypes() {
        return {
            issues: React.PropTypes.array
        }
    }

    //componentDidUpdate() {
    //    this.markdownContainer = React.findDOMNode(this.refs.markdown);
    //    if(!this.markdownContainer) {
    //        return;
    //    }
    //    var list = this.markdownContainer.querySelectorAll("li.checked, li.unchecked");
    //    console.log(list);
    //}

    render() {
        if (this.props.issue == null) {
            return <div className="RepositoryIssueList">
                <div className="markdown" ref="markdown">
                </div>
            </div>;
        }
        var ownerSubTasks = this.props.issue.body.split("\n").filter(isTODO);
        var commentSubTasks = this.props.comments.map(function (comment) {
            return comment.body.split("\n").filter(isTODO);
        });
        var subTasks = ownerSubTasks.concat(...commentSubTasks);
        var subTasksList = subTasks.join("\n");
        return <div className="RepositoryIssueList">
            <div className="markdown" ref="markdown">
                {md2react(subTasksList, {
                    tasklist: true
                })}
            </div>
        </div>
    }
}