// LICENSE : MIT
"use strict";
import React from "react"
export default class GitHubWebView extends React.Component {
    static get propTypes() {
        return {
            url: React.PropTypes.string
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        var window = this.iframe.contentWindow;
        var href = window.location.href;
        return nextProps.url !== href;
    }

    componentDidMount() {
        this.iframe = React.findDOMNode(this.refs.webview);
        this.iframe.setAttribute('nwfaketop', '');
        this.iframe.setAttribute('nwUserAgent', '');
        var window = this.iframe.contentWindow;
        this.iframe.addEventListener("load", ()=> {
            var window = this.iframe.contentWindow;
            var href = window.location.href;
            // disbale pjax!
            window.$.pjax.disable();
            this.props.changeViewURL(href);
            var textAreaList = Array.from(window.document.getElementsByTagName("textarea"));

            function textAreaHandler(event) {
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