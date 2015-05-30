// LICENSE : MIT
"use strict";
import React from "react"
export class IssueItem extends React.Component {
    render() {
        return <div className="IssueItem" onClick={this.props.onClickIssue}>
            <h3>{this.props.title}</h3>
        </div>
    }
}
export default class MyIssueList extends React.Component {
    static get propTypes() {
        return {
            issues: React.PropTypes.array,
            onClickIssue: React.PropTypes.func
        }
    }

    onClick(index) {
        this.props.onClickIssue(this.props.issues[index]);
    }

    render() {
        var issues = this.props.issues.map((issue, index) => {
            return <IssueItem key={issue.url} {...issue} onClickIssue={this.onClick.bind(this, index)}/>
        });
        return <div className="MyIssueList">
            {issues}
        </div>
    }
}