import React from "react";
import MessageList from "./messageList/messageList";
import Header from "./header/header";
import SendMessage from "./sendMessage/sendMessage";
import ReconnectingWebSocket from "reconnecting-websocket";
import notifyMe from "./messageList/notification";

const url = "ws://st-chat.shas.tel";
const urlProvider = async () => {
    return `${url}`;
};

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            name: this.props.user,
            ws: null,
            connect: ""
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    ws = new ReconnectingWebSocket(urlProvider);
    componentDidMount() {
        this.ws.onopen = () => {
            this.setState({
                connect: "online"
            });
        };

        this.ws.onmessage = evt => {
            const message = JSON.parse(evt.data);
            this.addMessage(message);

            if (typeof document.hidden !== "undefined") {
                notifyMe(message[0].message, message[0].from);
            }
        };

        this.ws.onclose = () => {
            this.setState({
                connect: "offline",
                ws: new WebSocket(url)
            });
        };
    }

    addMessage = message =>
        this.setState(state => ({ messages: [...state.messages, message] }));

    sendMessage = messageString => {
        const message = { from: this.state.name, message: messageString };
        this.ws.send(JSON.stringify(message));
        this.ws.onmessage = evt => {
            const message = JSON.parse(evt.data);
            this.addMessage(message);
        };
    };

    render() {
        return (
            <div className="app">
                <Header
                    connect={this.state.connect}
                    logOut={this.props.logout}
                    name={this.state.name}
                />
                <main className="wrapper-main">
                    <MessageList
                        messages={this.state.messages}
                        name={this.state.name}
                    />
                    <SendMessage sendMessage={this.sendMessage} />
                </main>
            </div>
        );
    }
}
