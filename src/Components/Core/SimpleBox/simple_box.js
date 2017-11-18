import React, {Component} from 'react'
import {Row, Column} from 'react-foundation'

export default class SimpleBox extends Component {
    render() {
        const {title, body, footer} = this.props;
        return (
            <div className="simple-box-container">
                <Column className="box" small={12} large={6} offsetOnLarge={3} isLast>
                    {title && <Row className="display simple-box-title">
                        <Column className="title">{title}</Column>
                    </Row>}
                    <Row className="display simple-box-body">
                        {body}
                    </Row>
                    {footer && <Row className="display simple-box-footer">
                        {footer}
                    </Row>}
                </Column>
            </div>
        )
    }
}