import CSS from 'csstype';
import React, {ReactNode} from 'react';
import {useHotkeys} from 'react-hotkeys-hook';

import {IButton} from '../../../types';
import styles from './action-button.module.scss';


interface IProps{
    style?: CSS.Properties,
    args: IButton
    renderButton?: (args: IButton) => ReactNode
    onClose?: (confirmValue?: string) => void,
    confirmValue?: string,
}

/**
 * Message
 */
const ActionButton = ({
    args,
    confirmValue,
    onClose,
    renderButton,
}: IProps) => {
    const {hotKey: currentHotKey, ...buttonArgs} = args;

    const generateClick = (hotKey: string) => {
        return () => {
            if(hotKey === currentHotKey) {
                handleOnClick();
            }
        };
    };


    useHotkeys('enter', generateClick('enter'), [currentHotKey, onClose]);
    useHotkeys('esc', generateClick('esc'), [currentHotKey, onClose]);
    useHotkeys('y', generateClick('y'), [currentHotKey, onClose]);
    useHotkeys('n', generateClick('n'), [currentHotKey, onClose]);

    const handleOnClick = () => {
        if(args.onClick) {
            const res = args.onClick(undefined, confirmValue);
            if(res === false) {
                return;
            }
        }
        onClose();
    };


    if(!renderButton){
        return <button type="button" 
            className={styles.customButton}
            {...buttonArgs}
            onClick={handleOnClick}
        />; 
    }
    

    return <>
        {renderButton({
            className: styles.customButton,
            ...buttonArgs,
            onClick: handleOnClick,
        })}
    </>;
};

export default ActionButton;

