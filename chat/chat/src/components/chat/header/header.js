import React from "react";
import "./../../../App.css";

export default function Header(props) {
    return (
        <div className="wrapper-header">
            <div className="wrapper-title">
                <p className="title">Hello {props.name}!</p>
            </div>
            <p>{props.connect}</p>
            <div className="button-logout">
                <button className="log-out" onClick={props.logOut}>
                    Log out
                </button>
            </div>
        </div>
    );
}
