import {clsx} from 'clsx';
import CSS from 'csstype';
import React, {ReactNode, useState} from 'react';

import useLocale from '../../../locales';
import {EStatus, IButton, ITextField} from '../../../types';
import {IMessageProps} from '../../types';
import {themeMap} from './config';
import styles from './message.module.scss';


interface IProps extends IMessageProps{
    style?: CSS.Properties,
    renderButton: (args: IButton) => ReactNode
    renderTextField: (args: ITextField) => ReactNode
    onClose?: (confirmValue?: string) => void,
}

/**
 * Message
 */
const Message = ({
    style,
    onClose,
    title,
    status,
    code,
    path,
    onClick,
    buttons,
    confirmPlaceholder,
    children,
    renderButton,
    renderTextField,
}: IProps) => {
    const statusTheme = typeof status !== 'undefined'? themeMap[status]: undefined;
    const isConfirm = status === EStatus.confirm;
    const [value, onChange] = useState<string>('');

    const {i18n} = useLocale();

    const isEnableConfirmField = typeof confirmPlaceholder !== 'undefined';


    /**
     * 渲染詢問對話框
     */
    const renderConfirm = () => {
        if(!isEnableConfirmField){
            return null;
        }

        return renderTextField({
            className: styles.textField,
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
            },
            isConfirm ? {
                className: styles.customButton,
                color: 'gray',
                children: i18n('com.dialog.cancel'),
            }: undefined,
        ];
        
        


        return <div
            className={styles.buttonGroup}
        >
            {currButtons
                .filter(row => row)
                .map((row, idx) => {
                    return <React.Fragment key={`dialog_${idx}`}>
                        {renderButton({
                            ...row,
                            className: styles.customButton,
                            onClick: (e) => {
                                if(row.onClick){
                                    const res = row.onClick(e, isEnableConfirmField ? value: undefined);
                                    if(res === false) {
                                        return;
                                    }
                                }
                                onClose();
                            },
                        })}
                    </React.Fragment>;

                })}
        </div>;
    };



    return (
        <div
            className={clsx(styles.message, statusTheme?.elClass)}
            style={style}
            role="alert"
        >
            {statusTheme && (
                <div className={styles.headerWrapper}>
                    {<statusTheme.icon/>}
                    <span className={styles.title}>{title ?? i18n(`com.dialog.${statusTheme.titleI18n}`)}</span>
                </div>
            )}
            {children && <div className={styles.content} dangerouslySetInnerHTML={{__html: children}}/>}

            {renderInfo()}

            {renderConfirm()}

            {renderButtons()}

            {/*<button type="button" onClick={onClose}>OK</button>*/}
        </div>
    );
};

export default Message;

