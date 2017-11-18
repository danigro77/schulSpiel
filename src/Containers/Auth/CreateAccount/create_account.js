import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Grid} from 'react-foundation'

import {createAccount} from "../../../Actions/user_actions";

import SimpleBox from "../../../Components/Core/SimpleBox/simple_box";
import InputField from "../../../Components/Core/InputField/input_field";
import ButtonRow from "../../../Components/Core/ButtonRow/button_row";
import MessageBox from "../../../Components/Core/MessageBox/message_box";

class CreateAccount extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirm_password: '',
            error: '',
        };
    }

    isValid() {
        const {email, password, confirm_password} = this.state;

        if (email === '' || password === '' || confirm_password === '') {
            this.setState({
                error: "No field can be empty."
            });
            return false;
        }
        if (password !== confirm_password) {
            this.setState({
                error: "The two passwords need to match."
            });
            return false;
        }
        return true;
    }

    dismissAlert() {
        this.setState({error: ''})
    }

    submitAccount(event) {
        event.preventDefault();
        if (this.isValid()) {
            this.props.createAccount(this.state.email, this.state.password)
                .then(() => {
                    this.props.history.replace('/');
                }).catch(error => {
                this.setState({error: error.message});
            });
        }
    }

    renderFormBody() {
        let style = {};
        if (this.state.error) {
            style.borderColor = 'red';
        }
        return (
            <Grid>
                <InputField
                    label="Email"
                    small={12}
                    inputChange={(event) => {this.setState({email: event.target.value})}}
                    style={style}
                />
                <InputField
                    label="Password"
                    type="password"
                    small={12}
                    inputChange={(event) => {this.setState({password: event.target.value})}}
                    style={style}
                />
                <InputField
                    label="Confirm Password"
                    type="password"
                    small={12}
                    inputChange={(event) => {this.setState({confirm_password: event.target.value})}}
                    style={style}
                />
            </Grid>
        )
    }

    renderFormButtons() {
        const buttonProps = {
            buttons: [
                {
                    small: 4,
                    type: 'submit',
                    text: 'Create Account',
                    klasses: 'expanded'
                },
                {
                    small: 4,
                    text: 'Go to Login',
                    onClick: () => {this.props.history.push('login')},
                    klasses: 'secondaryButton expanded'
                }
            ]
        };
        return (
            <ButtonRow {...buttonProps} />
        )
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => {this.submitAccount(event)}} className="create-account-form">
                    <SimpleBox
                        title={"Create New Account"}
                        body={this.renderFormBody()}
                        footer={this.renderFormButtons()}
                    />
                </form>
                {this.state.error && <MessageBox type='alert' closable onClick={this.dismissAlert.bind(this)}>
                    {this.state.error}
                </MessageBox>}
            </div>
        )
    }
}

export default connect(null,
    {
        createAccount,
    }
)(CreateAccount);