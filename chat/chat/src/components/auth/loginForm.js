import React from "react";
import "./../../App.css";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nickname: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ nickname: event.target.value });
    }

    handleSubmit() {
        this.props.setUser(this.state.nickname);
        localStorage.setItem("name", this.state.nickname);
    }

    render() {
        let { nickname } = this.state;
        if (localStorage.getItem !== null) {
            const name = localStorage.getItem("name");
            nickname = name;
        }

        return (
            <div className="wrapper-login">
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="nickname">
                        <h1 className="title-login-form">Your name?</h1>
                    </label>

                    <input
                        ref={input => {
                            this.textInput = input;
                        }}
                        className="nickname"
                        type="text"
                        placeholder={nickname}
                        onChange={this.handleChange}
                    />
                </form>
            </div>
        );
    }
}
