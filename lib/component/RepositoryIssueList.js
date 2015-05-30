// LICENSE : MIT
"use strict";
import React from "react"
export default class RepositoryIssueList extends React.Component {
    static get propTypes() {
        return {
            issues: React.PropTypes.array
        }
    }

    render() {
        return <div className="RepositoryIssueList">
            {this.props.issues}
        </div>
    }
}