import React from "react";
import "./../../../App.css";
// import { DateTime } from "luxon";
export default class MessageList extends React.Component {
    getData = data => {
        const maxDate = new Date(data);
        const isoDate = maxDate.toString();
        return isoDate.substr(4, 20);
    };

    render() {
        return (
            <ul className="message-list">
                {this.props.messages.map(message => {
                    console.log("message11", message);
                    return (
                        <li
                            key={message[0].id}
                            className={
                                message[0].from === this.props.name
                                    ? "my-message"
                                    : "server-message"
                            }
                        >
                            <div className="wrapper-message">
                                <div className="from-message">
                                    {message[0].from}
                                </div>
                                <div className="text-message">
                                    {message[0].message}
                                </div>
                                <div className="time-message">
                                    {this.getData(message[0].time)}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }
}
