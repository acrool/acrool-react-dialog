import {clsx} from 'clsx';
import CSS from 'csstype';
import React, {ReactNode, useEffect, useRef, useState} from 'react';

import {useDialog} from '../DialogProvider';
import useLocale, {ILocaleDictionaries} from '../locales';
import {EKeyboardKey, EStatus, IButton, ITextField, TOnSubmit} from '../types';
import ActionButton from './_components/ActionButton';
import {themeMap} from './config';
import styles from './dialog-wrapper.module.scss';
import {IDialogWrapperProps} from './types';


interface IProps extends IDialogWrapperProps{
    style?: CSS.Properties
    isDark?: boolean
    renderButton?: (args: IButton) => ReactNode
    renderTextField?: <V extends string|number>(args: ITextField<V>) => ReactNode
    onSubmit?: TOnSubmit
    isStatusIconVisible?: boolean
    locale?: string
    localeDictionaries?: ILocaleDictionaries
}

/**
 * Message
 */
const DialogWrapper = ({
    style,
    isDark,
    isStatusIconVisible = true,
    title,
    status,
    code,
    path,
    buttons,
    confirmPlaceholder,
    message,
    renderButton,
    renderTextField,
    locale = 'en-US',
    localeDictionaries,
}: IProps) => {
    const {hide, onSubmit} = useDialog();
    const inputRef = useRef<HTMLInputElement>(null);
    const statusTheme = typeof status !== 'undefined'? themeMap[status]: undefined;
    const isConfirm = status === EStatus.confirm;
    const [value, onChange] = useState<string>('');

    const {i18n} = useLocale(locale, localeDictionaries);

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
            return <div className={styles.inputWrapper}>
                <input type="text"
                    className={styles.textField}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={confirmPlaceholder}
                />
            </div>;
        }

        return <div className={styles.inputWrapper}>
            {renderTextField({
                ref: inputRef,
                className: styles.customTextField,
                value,
                onChange,
                defaultValue: '',
                placeholder: confirmPlaceholder
            })}
        </div>;
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

        const currButtons: Array<IButton|undefined> = buttons ?? [
            {
                className: styles.customButton,
                color: statusTheme?.mainBtnColor,
                children: i18n('com.dialog.ok'),
                hotKey: EKeyboardKey.Enter,
                type: 'submit',
            },
            isConfirm ? {
                className: styles.customButton,
                color: 'gray',
                children: i18n('com.dialog.cancel'),
                hotKey: EKeyboardKey.Escape,
                type: 'button',
            }: undefined,
        ];




        return <div
            className={styles.buttonGroup}
        >
            {currButtons
                .reduce((curr: IButton[], row) => {
                    if(row) return [...curr, row];
                    return curr;
                }, [])
                .map((row, idx) => {
                    return <ActionButton
                        key={`action_${idx}`}
                        args={row}
                        renderButton={renderButton}
                    />;
                })
            }
        </div>;
    };


    /**
     * 渲染訊息
     */
    const renderMessage = () => {
        if(typeof message === 'string'){
            return <div className={styles.content} dangerouslySetInnerHTML={{__html: message}}/>;
        }
        return <div className={styles.content} children={message}/>;
    };


    /**
     * 處理送出表單
     * @param e
     */
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if(onSubmit){
            const res = onSubmit(e.target?.[0]?.value);
            if(res === false){
                return;
            }
        }
        hide();

    };


    return (
        <div
            className={clsx(styles.dialogWrapper, statusTheme?.elClass, {[styles.darkTheme]: isDark})}
            style={style}
            role="dialog"
        >
            {statusTheme && (
                <div className={styles.headerWrapper}>
                    {isStatusIconVisible && <statusTheme.icon/>}
                    <span className={styles.title}>{title ?? i18n(`com.dialog.${statusTheme.titleI18n}`)}</span>
                </div>
            )}

            <div className={styles.contentWrapper}>
                {renderMessage()}
            </div>

            {renderInfo()}

            <form onSubmit={handleSubmit}>
                {renderConfirm()}

                {renderButtons()}
            </form>
        </div>
    );
};

export default DialogWrapper;

