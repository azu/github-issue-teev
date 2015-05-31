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
        var iframe = React.findDOMNode(this.refs.webview);
        iframe.setAttribute('nwfaketop', '');
        iframe.addEventListener("load", function () {
            var window = iframe.contentWindow;
            var textAreaList = Array.from(window.document.getElementsByTagName("textarea"));
            console.log(textAreaList);
            function textAreaHandler(event) {
                console.log(event);
                var isMetaKey = event.metaKey || event.ctrlKey;
                if (isMetaKey && (event.key === "e" || event.keyCode === 69)) {
                    console.log(event.target);
                    require("./boot-codemirror")(window, event.target);
                }
            }

            textAreaList.forEach(function (textArea) {
                textArea.addEventListener("keydown", textAreaHandler);
            });
        })
    }

    render() {
        return <div className="GitHubWebView">
            <iframe ref="webview" src={this.props.url}></iframe>
        </div>
    }
}