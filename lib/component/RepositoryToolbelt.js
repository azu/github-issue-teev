// LICENSE : MIT
"use strict";
import React from "react"
export default class RepositoryToolbelt extends React.Component {
    onClickedStar() {
        if (this.props.isFavRepository(this.props.issue)) {
            this.props.removeFavRepository(this.props.issue);
        } else {
            this.props.addFavRepository(this.props.issue);
        }
    }

    render() {
        if (this.props.issue == null) {
            return <div className="RepositoryToolbelt">
            </div>;
        }
        var star = this.props.isFavRepository(this.props.issue) ? "★" : "☆";
        return <div className="RepositoryToolbelt">
            <button onClick={this.onClickedStar.bind(this)}>{star}</button>
            <span>{this.props.issue.title}</span>
        </div>
    }
}