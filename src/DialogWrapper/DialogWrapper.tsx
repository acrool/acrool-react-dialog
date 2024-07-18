import {clsx} from 'clsx';
import CSS from 'csstype';
import React, {ReactNode, useEffect, useState} from 'react';

import useLocale from '../locales';
import {EStatus, IButton, ITextField} from '../types';
import ActionButton from './_components/ActionButton';
import {themeMap} from './config';
import styles from './dialog-wrapper.module.scss';
import {IDialogWrapperProps} from './types';


interface IProps extends IDialogWrapperProps{
    style?: CSS.Properties,
    renderButton: (args: IButton) => ReactNode
    renderTextField: (args: ITextField) => ReactNode
    onClose?: (confirmValue?: string) => void,
}

/**
 * Message
 */
const DialogWrapper = ({
    style,
    onClose,
    title,
    status,
    code,
    path,
    onClick,
    buttons,
    confirmPlaceholder,
    message,
    renderButton,
    renderTextField,
}: IProps) => {
    const statusTheme = typeof status !== 'undefined'? themeMap[status]: undefined;
    const isConfirm = status === EStatus.confirm;
    const [value, onChange] = useState<string>('');

    const {i18n} = useLocale();

    const isEnableConfirmField = typeof confirmPlaceholder !== 'undefined';


    useEffect(() => {
        // 移除關注中的項目
        (document.activeElement as HTMLElement).blur();
    }, []);

    /**
     * 渲染詢問對話框
     */
    const renderConfirm = () => {
        if(!isEnableConfirmField){
            return null;
        }

        if(!renderTextField){
            return <input type="text"
                className={styles.textField}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={confirmPlaceholder}
            />;
        }

        return renderTextField({
            className: styles.customTextField,
            value,
            onChange,
            defaultValue: '',
            placeholder: confirmPlaceholder
        });
    };


    /**
     * 渲染除錯資訊
     */
    const renderInfo = () => {
        const content = [code, path].filter(curr => curr);
        if(content.length === 0){
            return null;
        }

        return <div className={styles.statusCode}>
            {`${content.join(' | ')}`}
        </div>;
    };



    /**
     * 渲染按鈕功能
     */
    const renderButtons = () => {

        const currButtons: Array<IButton> = buttons ?? [
            {
                className: styles.customButton,
                onClick,
                color: statusTheme?.mainBtnColor,
                children: i18n('com.dialog.ok'),
                hotKey: 'enter'
            },
            isConfirm ? {
                className: styles.customButton,
                color: 'gray',
                children: i18n('com.dialog.cancel'),
                hotKey: 'esc'
            }: undefined,
        ];




        return <div
            className={styles.buttonGroup}
        >
            {currButtons
                .filter(row => row)
                .map((row, idx) => {
                    return <ActionButton
                        key={`action_${idx}`}
                        args={row}
                        onClose={onClose}
                        confirmValue={isEnableConfirmField ? value: undefined}
                        renderButton={renderButton}
                    />;
                })
            }
        </div>;
    };



    return (
        <div
            className={clsx(styles.dialogWrapper, statusTheme?.elClass)}
            style={style}
            role="alert"
        >
            {statusTheme && (
                <div className={styles.headerWrapper}>
                    {<statusTheme.icon/>}
                    <span className={styles.title}>{title ?? i18n(`com.dialog.${statusTheme.titleI18n}`)}</span>
                </div>
            )}

            <div className={styles.content} dangerouslySetInnerHTML={{__html: message}}/>

            {renderInfo()}

            {renderConfirm()}

            {renderButtons()}
        </div>
    );
};

export default DialogWrapper;
