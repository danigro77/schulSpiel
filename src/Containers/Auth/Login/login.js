import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Grid} from 'react-foundation'

import {login, getUser} from "../../../Actions/user_actions";

import SimpleBox from "../../../Components/Core/SimpleBox/simple_box";
import InputField from "../../../Components/Core/InputField/input_field";
import ButtonRow from "../../../Components/Core/ButtonRow/button_row";
import MessageBox from "../../../Components/Core/MessageBox/message_box";

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
        };
    }

    componentWillMount() {
        this.props.getUser();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.user.email) {
            this.props.history.push('/');
        }
    }

    dismissAlert() {
        this.setState({error: ''})
    }

    submitLogin(event) {
        event.preventDefault();
        this.props.login(this.state.email, this.state.password)
            .catch(error => {
                this.setState({error});
            });
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
            </Grid>
        )
    }

    renderFormButtons() {
        const buttonProps = {
            buttons: [
                {
                    small: 4,
                    type: 'submit',
                    text: 'Log In',
                    klasses: 'expanded'
                },
                {
                    small: 4,
                    text: 'Create New Account',
                    onClick: () => {this.props.history.push('createAccount')},
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
                <form onSubmit={(event) => {this.submitLogin(event)}} className="login-form">
                    <SimpleBox
                        title={"Login"}
                        body={this.renderFormBody()}
                        footer={this.renderFormButtons()}
                    />
                </form>
                {this.state.error && <MessageBox type='alert' closable onClick={this.dismissAlert.bind(this)}>
                    Your email or password is incorrect.
                </MessageBox>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {user: state.user};
}

export default connect(mapStateToProps,
    {
        login,
        getUser
    }
)(Login);