import React, {ReactNode, useState} from 'react';
import CSS from 'csstype';
import styles from './message.module.scss';
import {themeMap} from './config';
import {IMessageProps} from '../../types';
import {ulid} from 'ulid';
import {IButton, ITextField} from '../../../types';
import {clsx} from 'clsx';
import useLocale from "../../../locales";


interface IProps extends IMessageProps{
    style?: CSS.Properties,
    renderButton: (args: IButton) => ReactNode
    renderTextField: (args: ITextField) => ReactNode
    onClose?: (confirmValue?: string) => void,
    isConfirm?: boolean
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
    confirm,
    children,
    renderButton,
    renderTextField,
}: IProps) => {
    const statusTheme = typeof status !== 'undefined'? themeMap[status]: undefined;
    const [value, onChange] = useState<string>('');

    const {i18n} = useLocale();

    const isConfirm = typeof confirm !== 'undefined';


    /**
     * 渲染詢問對話框
     */
    const renderConfirm = () => {
        if(!isConfirm){
            return null;
        }

        return renderTextField({
            className: styles.textField,
            value,
            onChange,
            defaultValue: '',
            placeholder: confirm
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

        const currButtons = buttons ?? [
            {
                className: styles.customButton,
                onClick: (e) => {
                    if(onClick){
                        const res = onClick(e, isConfirm ? value: undefined);
                        if(res === false) {
                            return;
                        }
                    }
                    onClose();
                },
                color: status,
                children: i18n('com.dialog.ok'),
            }
        ];


        return <div
            className={styles.buttonGroup}
        >
            {currButtons?.map((row) => {
                const key = ulid().toLowerCase();
                

                return <React.Fragment key={key}>
                    {renderButton({
                        ...row,
                        className: styles.customButton,
                        onClick: (e) => {
                            if(row.onClick){
                                const res = row.onClick(e, isConfirm ? value: undefined);
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
                    {statusTheme.icon()}
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

