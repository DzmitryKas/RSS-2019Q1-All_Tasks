import React from "react";
import "./App.css";
// import { BrowserRouter, Route } from "react-router-dom";
import Main from "./components/chat/Main";
import LoginForm from "./components/auth/loginForm";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            socket: null,
            user: null
        };
        this.setUser = this.setUser.bind(this);
        this.logout = this.logout.bind(this);
    }

    setUser(user) {
        this.setState({ user });
    }

    logout() {
        this.setState({ user: null });
    }

    render() {
        const { user } = this.state;

        return (
            <div className="container">
                {!user ? (
                    <LoginForm setUser={this.setUser} />
                ) : (
                    <Main user={user} logout={this.logout} />
                )}
            </div>
        );
    }
}
