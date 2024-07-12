import React, {useCallback, useEffect, useState} from 'react';
import {EStatus, IItem, THidden, TShow, TShowMulti} from '../types';
import DialogWithPortal from './DialogWithPortal';
import Dialog from '../Dialog';
import {IDialogPortalProps} from './types';
import {rootId} from '../config';


/**
 * Global var
 */
export let dialog: TShowMulti;

const DialogPortal: React.FC<IDialogPortalProps> = (props) => {
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
     * 隱藏 Dialog
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
        return <Dialog
            onExitComplete={hidden}
            renderButton={props.renderButton}
            renderTextField={props.renderTextField}
            {...itemArg}
        >
            {message}
        </Dialog>;
    };

    return (
        <DialogWithPortal id={props.id || rootId}>
            {item && renderDialog()}
        </DialogWithPortal>
    );
};

export default DialogPortal;
