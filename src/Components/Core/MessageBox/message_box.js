import React, {Component} from 'react'
import {Row, Column} from 'react-foundation'

export default class MessageBox extends Component {
    render() {
        return (
            <Column className={`callout ${this.props.type} message-box`}
                    onClick={() => {this.props.onClick && this.props.onClick()}}>
                <Row>
                    <Column small={11} large={6} offsetOnLarge={3} className="text-center">
                        {this.props.children}
                    </Column>
                    {this.props.closable && <Column small={1} large={1} offsetOnLarge={2}
                                                    className="text-right close-button"
                    >
                        <span aria-hidden="true">&times;</span>
                    </Column>}
                </Row>
            </Column>
        )
    }
}