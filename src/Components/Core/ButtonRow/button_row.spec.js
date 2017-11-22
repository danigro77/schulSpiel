import React from 'react'
import sinon from 'sinon'

import ButtonRow from './button_row'

const buttons = {
    oneButton: [
        {
            text: 'Spec Test'
        }
    ], multipleButtons: [
        {
            text: 'Spec Test Button 1'
        },
        {
            text: 'Spec Test Button 2',
            type: 'submit',
        }
    ], eventButtons: [
        {
            text: 'Spec Test Event',
            onClick: sinon.spy(),
        },
    ]
};

describe('<BottonRow />', () => {
    describe('snapshots', () => {
        it('render a button row with one button', () => {
            const wrapper = shallow(
                <ButtonRow
                    buttons={buttons.oneButton}
                />
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('render a button row with multiple button', () => {
            const wrapper = shallow(
                <ButtonRow
                    buttons={buttons.multipleButtons}
                    small={6}
                    large={4}
                />
            );
            expect(wrapper).toMatchSnapshot();

        });
    });

    describe('DOM testing', () => {
        it('render a button row with one button', () => {
            const wrapper = mount(
                <ButtonRow
                    buttons={buttons.oneButton}
                />
            );

            expect(wrapper.find('input').length).toEqual(1);
            expect(wrapper.find('input').props().value).toEqual(buttons.oneButton[0].text);
        });

        it('render a button row with multiple button', () => {
            const buttonProps = buttons.multipleButtons;
            const wrapper = mount(
                <ButtonRow
                    buttons={buttonProps}
                />
            );
            expect(wrapper.find('input').length).toEqual(2);
            for (let i=0; i<buttonProps.length; i++) {
                expect(wrapper.find('input').at(i).props().value).toEqual(buttonProps[i].text);
            }
        });

        it('registers a button click when an event is passed in', () => {
            const buttonProps = buttons.eventButtons;
            const wrapper = mount(
                <ButtonRow
                    buttons={buttonProps}
                />
            );
            expect(wrapper.find('input').props().value).toEqual(buttonProps[0].text);
            wrapper.find('input').simulate('click');
            expect(buttonProps[0].onClick.calledOnce).toEqual(true);
        });

    });
});

