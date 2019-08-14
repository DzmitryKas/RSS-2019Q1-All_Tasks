import React from "react";
import "./../../../App.css";

export default class SendMessage extends React.Component {
    constructor() {
        super();
        this.state = {
            message: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            message: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.sendMessage(this.state.message);
        this.setState({
            message: ""
        });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="send-message">
                <input
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="Type your message"
                    className="input-message"
                    type="text"
                />
            </form>
        );
    }
}
