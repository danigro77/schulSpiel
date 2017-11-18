import React, {Component} from 'react'
import {Cell} from 'react-foundation'

export default class InputField extends Component {

    getCellSize() {
        let classes = '';
        if (this.props.small) {
            classes += `small-${this.props.small.toString()} `
        }
        if (this.props.medium) {
            classes += `medium-${this.props.medium.toString()} `
        }
        if (this.props.large) {
            classes += `large-${this.props.large.toString()} `
        }
        return classes;
    }

    render() {
        const {label, type, placeholder, value, inputChange, style} = this.props;
        return (
            <Cell className={this.getCellSize()}>
                <label>{label}
                    <input
                        type={type || 'text'}
                        placeholder={placeholder || ''}
                        value={value}
                        onChange={inputChange}
                        style={style}
                    />
                </label>
            </Cell>
        )
    }
}