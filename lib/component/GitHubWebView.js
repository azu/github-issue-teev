// LICENSE : MIT
"use strict";
import React from "react"
export default class GitHubWebView extends React.Component {
    static get propTypes() {
        return {
            url: React.PropTypes.string
        }
    }

    componentDidMount() {
        React.findDOMNode(this.refs.webview).setAttribute('nwfaketop', '');
    }

    render() {
        return <div className="GitHubWebView">
            <iframe ref="webview" src={this.props.url}></iframe>
        </div>
    }
}