import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {Row, Column} from 'react-foundation'
import ButtonRow from "../../../Components/Core/ButtonRow/button_row";
import {getUser, logout} from "../../../Actions/user_actions";

class LandingPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userLoggedIn: false,
        };
    }

    componentWillMount() {
        this.props.getUser();
        const userLoggedIn = !this.props.user.loading && !!this.props.user.email;
        this.setState({userLoggedIn});
    }

    componentWillReceiveProps(newProps) {
        const userLoggedIn = !newProps.user.loading && !!newProps.user.email;
        this.setState({userLoggedIn});
    }

    renderButtons() {
        let buttonProps = {};
        if (this.state.userLoggedIn) {
            buttonProps.buttons = [
                {
                    small: 4,
                    text: 'Log out',
                    onClick: () => {this.props.logout()},
                    klasses: 'expanded'
                }
            ]
        } else {
            buttonProps.buttons = [
                {
                    small: 4,
                    text: 'Login',
                    onClick: () => {this.props.history.push('login')},
                    klasses: 'expanded'
                },
                {
                    small: 4,
                    text: 'Create New Account',
                    onClick: () => {this.props.history.push('createAccount')},
                    klasses: 'expanded'
                }
            ];
        }
        return (
            <ButtonRow {...buttonProps} />
        )
    }

    render() {
        const message = this.state.userLoggedIn ? `Welcome ${this.props.user.email} to Schulspiel` : 'Welcome to the Schulspiel'
        return (
            <div className="landing-page">
                <Row><Column><h1 className="text-center">{message}</h1></Column></Row>
                <Row>{this.renderButtons()}</Row>
            </div>
        )
    }
}

let form = reduxForm({
    form: ''
})(LandingPage);

form = connect((state, ownProps) => (
    {
        user: state.user
    }),
    {
        getUser,
        logout
    }
)(form);

export default form;