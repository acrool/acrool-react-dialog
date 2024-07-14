import ReactPortal from '@acrool/react-portal';
import React, {useCallback, useEffect, useState} from 'react';

import {rootId} from './config';
import styles from './dialog.module.scss';
import DialogWrapper from './DialogWrapper';
import {EStatus, IDialogProps, IItem, THidden, TShow, TShowMulti} from './types';


/**
 * Global var
 */
export let dialog: TShowMulti;



const Dialog = (props: IDialogProps) => {
    const [item, setItem] = useState<IItem>();

    // set global
    useEffect(() => {
        dialog = show as TShowMulti;

        dialog.success = (message, args) => show({...args, message, status: EStatus.success});
        dialog.warning = (message, args) => show({...args, message, status: EStatus.warning});
        dialog.error = (message, args) => show({...args, message, status: EStatus.error});
        dialog.info = (message, args) => show({...args, message, status: EStatus.info});
        dialog.confirm = (message, args) => show({...args, message, status: EStatus.confirm});
    }, []);


    /**
     * 顯示 Dialog
     * @param newItem
     */
    const show: TShow = useCallback((args) => {

        setItem(args);
    }, []);


    /**
     * 刪除 Dialog 在 Dom 中
     * @param key
     */
    const hidden: THidden = useCallback(() => {
        setItem(undefined);
    }, []);


    /**
     * 渲染項目
     */
    const renderDialog = () => {
        const {message, ...itemArg} = item;
        return <DialogWrapper
            onExitComplete={hidden}
            renderButton={props.renderButton}
            renderTextField={props.renderTextField}
            {...itemArg}
        >
            {message}
        </DialogWrapper>;
    };

    return (
        <ReactPortal
            id={props.id || rootId}
            className={styles.root}
        >
            {item && renderDialog()}
        </ReactPortal>
    );
};

export default Dialog;
