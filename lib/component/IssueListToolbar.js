// LICENSE : MIT
"use strict";
import React from "react"
export default class IssueListToolbar extends React.Component {
    render() {
        return <div className="IssueListToolbar">
            <button className="refresh" onClick={this.props.onRefresh}>Reload</button>
        </div>
    }
}