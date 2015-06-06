// LICENSE : MIT
"use strict";
import React from "react"
export default class GitHubTokenForm extends React.Component {
    validGitHubToken(){
        var token = React.findDOMNode(this.refs.inputToken).value;
        this.props.testToken(token);
    }
    render() {
        return <div className="GitHubTokenForm">
            <input type="text" ref="inputToken" placeholder="github token"/>
            <button onClick={this.validGitHubToken.bind(this)}>Test Token</button>
        </div>
    }
}