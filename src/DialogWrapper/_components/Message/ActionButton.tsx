import CSS from 'csstype';
import React, {ReactNode} from 'react';
import {useHotkeys} from 'react-hotkeys-hook';

import {IButton} from '../../../types';
import styles from './message.module.scss';


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


    const generateClick = (hotKey?: string) => {
        return () => {

            if(!hotKey || args.hotKey === currentHotKey){
                if(args.onClick) {
                    const res = args.onClick(undefined, confirmValue);
                    if(res === false) {
                        return;
                    }
                }
                onClose();
            }
        };
    };

    useHotkeys('enter', generateClick('enter'), [args.hotKey]);
    useHotkeys('esc', generateClick('esc'), [args.hotKey]);
    useHotkeys('y', generateClick('y'), [args.hotKey]);
    useHotkeys('n', generateClick('n'), [args.hotKey]);


    if(!renderButton){
        return <button type="button" 
            className={styles.customButton}
            {...buttonArgs}
            onClick={generateClick()}
        />; 
    }
    

    return <>
        {renderButton({
            className: styles.customButton,
            ...buttonArgs,
            onClick: generateClick(),
        })}
    </>;
};

export default ActionButton;

