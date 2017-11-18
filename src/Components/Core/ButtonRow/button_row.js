import React, {Component} from 'react'
import {Grid, Cell} from 'react-foundation'

export default class ButtonRow extends Component {

    getCellSize(itemProps) {
        let classes = '';
        if (itemProps.small) {
            classes += `small-${itemProps.small.toString()} `
        }
        if (itemProps.medium) {
            classes += `medium-${itemProps.medium.toString()} `
        }
        if (itemProps.large) {
            classes += `large-${itemProps.large.toString()} `
        }
        return classes;
    }

    renderButtons() {
        return this.props.buttons.map((button, index) => {
            let buttonProps = {
                type: button.type || 'button',
                value: button.text || 'Click me',
                className: 'button',
            };
            if (button.onClick) {
                buttonProps.onClick = button.onClick;
            }
            if (button.klasses) {
                buttonProps.className += ` ${button.klasses}`
            }
            return (
                <Cell className={this.getCellSize(button)} key={index}>
                    <input {...buttonProps} />
                </Cell>
            )
        })
    }

    render() {
        return (
            <Grid className="align-justify">
                {this.renderButtons()}
            </Grid>
        )
    }
}