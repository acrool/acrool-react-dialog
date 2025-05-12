import CSS from 'csstype';
import React, {ReactNode, useCallback} from 'react';

import {useDialog} from '../../../DialogProvider';
import {EKeyboardKey, IButton} from '../../../types';
import HotkeyListener from '../HotkeyListener';
import styles from './action-button.module.scss';


interface IProps{
    style?: CSS.Properties
    args: IButton
    renderButton?: (args: IButton) => ReactNode
}

/**
 * Message
 */
const ActionButton = ({
    args,
    renderButton,
}: IProps) => {
    const {hotKey: currentHotKey, ...buttonArgs} = args;
    const {hide, onSubmit} = useDialog();

    /**
     * 處理當鍵盤按[上 下 空白]的時候開啟選單
     */
    const handleOnHotKey = useCallback((evt: KeyboardEvent) => {
        if(args.hotKey === evt.key as EKeyboardKey) {
            evt.stopPropagation();
            handleOnClick();
        }
    }, []);


    /**
     * 處理點擊事件
     */
    const handleOnClick = () => {
        if(args.type === 'submit' && onSubmit){
            return;
        }

        hide();
    };


    /**
     * 渲染按鈕區塊
     */
    const renderButtonWrapper = () => {
        if(renderButton){
            return renderButton({
                className: styles.customButton,
                ...buttonArgs,
                onClick: handleOnClick,
            });
        }

        return <button
            className={styles.customButton}
            {...buttonArgs}
            onClick={handleOnClick}
        />;
    };



    return <>
        {renderButtonWrapper()}

        {/* 註冊事件 */}
        {args.hotKey && <HotkeyListener onKeyDown={handleOnHotKey}/>}
    </>;
};

export default ActionButton;

